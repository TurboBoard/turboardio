import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import { ClaimHelper } from "@Helpers";

import aws from "@Apis/aws";

const edit = async (req: NextApiRequest, res: NextApiResponse) => {
    const { bounty_id, details, end_date, start_date } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    // If a bounty is already claimed it cannot be edited
    const is_claimed = await ClaimHelper.get_is_claimed(bounty_id);

    if (is_claimed) {
        res.status(401).end();

        return;
    }

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
        bounty_id: aws.dynamo.input(bounty_id),
        created_at: aws.dynamo.input(created_at),
        details: aws.dynamo.input(details),
        game_id: aws.dynamo.input(game_id),
    } as {
        [key: string]: any;
    };

    if (end_date) {
        updated_item.end_date = aws.dynamo.input(end_date);
    }

    if (start_date) {
        updated_item.start_date = aws.dynamo.input(start_date);
    }

    await aws.dynamo.put_item({
        TableName: "turboardio_bounties",
        Item: updated_item,
    });

    await res.revalidate(`/bounty/${bounty_id}`);

    res.status(200).json({ success: true });
};

export default withApiAuthRequired(edit);
