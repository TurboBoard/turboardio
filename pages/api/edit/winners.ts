import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import { BountyHelper } from "@Helpers";

import aws from "@Apis/aws";

const edit = async (req: NextApiRequest, res: NextApiResponse) => {
    const { bounty_id, claims } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    // Let's double check this user has admin privileges on this bounty
    const is_admin = await BountyHelper.is_admin(bounty_id, turboardio_user_id);

    if (!is_admin) {
        res.status(401).end();

        return;
    }

    for (const { amount, claim_id } of claims) {
        const {
            Item: { bounty_id, comment, created_at, link, user_id },
        } = await aws.dynamo.get_item({
            TableName: "turboardio_claims",
            Key: {
                claim_id: aws.dynamo.input(claim_id),
            },
        });

        let updated_item = {
            bounty_id,
            claim_id: aws.dynamo.input(claim_id),
            comment,
            created_at,
            link,
            user_id,
        } as {
            [key: string]: any;
        };

        if (amount) {
            updated_item.amount = aws.dynamo.input(amount);
        }

        await aws.dynamo.put_item({
            TableName: "turboardio_claims",
            Item: updated_item,
        });
    }

    await res.revalidate(`/bounty/${bounty_id}`);

    res.status(200).json({ success: true });
};

export default withApiAuthRequired(edit);
