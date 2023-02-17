import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import aws from "@Apis/aws";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { bounty_id, details, discord_link } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_bounties",
        Key: {
            bounty_id: aws.dynamo.input(bounty_id),
        },
    });

    const { admin_id, created_at, game_id } = aws.dynamo.unmarshall(Item);

    if (admin_id !== turboardio_user_id) {
        res.status(401).end();

        return;
    }

    let updated_item = {
        admin_id: aws.dynamo.input(turboardio_user_id),
        created_at: aws.dynamo.input(created_at),
        bounty_id: aws.dynamo.input(bounty_id),
        details: aws.dynamo.input(details),
        game_id: aws.dynamo.input(game_id),
    } as {
        [key: string]: any;
    };

    if (discord_link) {
        updated_item.discord_link = aws.dynamo.input(discord_link);
    }

    await aws.dynamo.put_item({
        TableName: "turboardio_bounties",
        Item: updated_item,
    });

    await res.revalidate(`/bounty/${bounty_id}`);

    res.status(200).json({ success: true });
};

export default withApiAuthRequired(create);
