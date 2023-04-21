import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import get_bounty from "@Services/get_bounty";

import { Bounties } from "@Types";

const get_bounties = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
        FilterExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": aws.dynamo.input(turboardio_user_id),
        },
    });

    const bounties: Bounties = [];

    if (!Items.length) {
        res.status(200).json({ bounties });

        return;
    }

    const sorted: any[] = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const item of sorted) {
        const { admin, amount, created_at, end_date, game, id, is_claimed, is_locked, pledges } = await get_bounty(item.bounty_id);

        bounties.push({
            admin,
            amount,
            created_at,
            end_date,
            game,
            id,
            is_claimed,
            is_expired: is_locked,
            pledges,
        });
    }

    res.status(200).json({ bounties });
};

export default withApiAuthRequired(get_bounties);
