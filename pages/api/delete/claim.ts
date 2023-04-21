import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import aws from "@Apis/aws";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { claim_id } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_claims",
        Key: {
            claim_id: aws.dynamo.input(claim_id),
        },
    });

    const { bounty_id, user_id } = aws.dynamo.unmarshall(Item);

    if (turboardio_user_id !== user_id) {
        res.status(401).end();

        return;
    }

    await aws.dynamo.delete_item({
        TableName: "turboardio_claims",
        Key: {
            claim_id: aws.dynamo.input(claim_id),
        },
    });

    await res.revalidate(`/bounty/${bounty_id}`);

    res.status(200).json({ success: true });
};

export default withApiAuthRequired(create);
