import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import { ClaimHelper } from "@Helpers";

import aws from "@Apis/aws";

const edit = async (req: NextApiRequest, res: NextApiResponse) => {
    const { claim_id, comment, link } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_claims",
        Key: {
            claim_id: aws.dynamo.input(claim_id),
        },
    });

    const { bounty_id, created_at, user_id } = aws.dynamo.unmarshall(Item);

    // If a bounty is already claimed it cannot be edited
    const is_claimed = await ClaimHelper.get_is_claimed(bounty_id);

    if (is_claimed) {
        res.status(401).end();

        return;
    }

    if (user_id !== turboardio_user_id) {
        res.status(401).end();

        return;
    }

    let updated_item = {
        claim_id: aws.dynamo.input(claim_id),
        bounty_id: aws.dynamo.input(bounty_id),
        created_at: aws.dynamo.input(created_at),
        link: aws.dynamo.input(link),
        user_id: aws.dynamo.input(turboardio_user_id),
    } as {
        [key: string]: any;
    };

    if (comment) {
        updated_item.comment = aws.dynamo.input(comment);
    }

    await aws.dynamo.put_item({
        TableName: "turboardio_claims",
        Item: updated_item,
    });

    await res.revalidate(`/bounty/${bounty_id}`);

    res.status(200).json({ success: true });
};

export default withApiAuthRequired(edit);
