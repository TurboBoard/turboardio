import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import { nanoid } from "nanoid";

import aws from "@Apis/aws";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { details, game_id } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const bounty_id = nanoid();

    const created_at = new Date().toISOString();

    await aws.dynamo.put_item({
        TableName: "turboardio_bounties",
        Item: {
            admin_id: aws.dynamo.input(turboardio_user_id),
            created_at: aws.dynamo.input(created_at),
            bounty_id: aws.dynamo.input(bounty_id),
            details: aws.dynamo.input(details),
            game_id: aws.dynamo.input(game_id),
        },
    });

    const json = { bounty_id };

    res.status(200).json(json);
};

export default withApiAuthRequired(create);
