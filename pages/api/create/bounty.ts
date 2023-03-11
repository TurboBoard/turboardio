import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import { nanoid } from "nanoid";

import aws from "@Apis/aws";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { details, end_date, game_id, start_date } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const bounty_id = nanoid();

    const created_at = new Date().toISOString();

    let Item = {
        admin_id: aws.dynamo.input(turboardio_user_id),
        bounty_id: aws.dynamo.input(bounty_id),
        created_at: aws.dynamo.input(created_at),
        details: aws.dynamo.input(details),
        game_id: aws.dynamo.input(game_id),
    } as {
        [key: string]: any;
    };

    if (end_date) {
        Item.end_date = aws.dynamo.input(end_date);
    }

    if (start_date) {
        Item.start_date = aws.dynamo.input(start_date);
    }

    await aws.dynamo.put_item({
        TableName: "turboardio_bounties",
        Item,
    });

    res.status(200).json({ bounty_id });
};

export default withApiAuthRequired(create);
