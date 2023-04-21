import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import aws from "@Apis/aws";

import get_bounty from "@Services/get_bounty";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { bounty_id } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { admin, is_claimed, is_locked } = await get_bounty(bounty_id);

    if (is_claimed || is_locked) {
        res.status(401).end();

        return;
    }

    if (turboardio_user_id !== admin.id) {
        res.status(401).end();

        return;
    }

    await aws.dynamo.delete_item({
        TableName: "turboardio_bounties",
        Key: {
            bounty_id: aws.dynamo.input(bounty_id),
        },
    });

    res.status(200).json({ success: true });
};

export default withApiAuthRequired(create);
