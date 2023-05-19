import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import { TurboardioUserHelper } from "@Helpers";

import { ClaimsItem } from "@Types";

import { format } from "@Lib";

const get_bounties = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_claims",
        FilterExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": aws.dynamo.input(turboardio_user_id),
        },
    });

    const claims: ClaimsItem[] = [];

    if (!Items.length) {
        res.status(200).json({ claims });

        return;
    }

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    const user = await TurboardioUserHelper.get_turboardio_user(turboardio_user_id);

    for (const { amount, bounty_id, comment, created_at, claim_id, link } of sorted) {
        const claim: ClaimsItem = {
            bounty_id,
            comment: comment || null,
            created_at: format.iso(created_at),
            id: claim_id,
            is_winner: amount ? true : false,
            link,
            user,
        };

        claims.push(claim);
    }

    res.status(200).json({ claims });
};

export default withApiAuthRequired(get_bounties);
