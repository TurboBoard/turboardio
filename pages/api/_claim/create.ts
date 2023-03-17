import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import { nanoid } from "nanoid";

import aws from "@Apis/aws";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { bounty_id, comment, link } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const claim_id = nanoid();

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
