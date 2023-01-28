import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import { nanoid } from "nanoid";

import aws from "@Apis/aws";

import { Bounty, TurboardioUser } from "@Types";

const get_existing_claim_id = async (bounty_id: Bounty["id"], user_id: TurboardioUser["id"]) => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_claims",
        FilterExpression: "bounty_id = :bounty_id AND user_id = :user_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
            ":user_id": aws.dynamo.input(user_id),
        },
    });

    if (!Items.length) return null;

    const { claim_id } = aws.dynamo.unmarshall(Items[0]);

    return claim_id;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { bounty_id, comment, link } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const existing_claim_id = await get_existing_claim_id(bounty_id, turboardio_user_id);

    const claim_id = existing_claim_id || nanoid();

    const created_at = new Date().toISOString();

    let Item = {
        claim_id: aws.dynamo.input(claim_id),
        bounty_id: aws.dynamo.input(bounty_id),
        created_at: aws.dynamo.input(created_at),

        link: aws.dynamo.input(link),
        user_id: aws.dynamo.input(turboardio_user_id),
    } as {
        [key: string]: any;
    };

    if (comment) {
        Item.comment = aws.dynamo.input(comment);
    }

    await aws.dynamo.put_item({
        TableName: "turboardio_claims",
        Item,
    });

    await res.revalidate(`/bounty/${bounty_id}`);

    res.status(200).json({ success: true });
};

export default withApiAuthRequired(create);
