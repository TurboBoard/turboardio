import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

import { nanoid } from "nanoid";

import aws from "@Apis/aws";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { amount, bounty_id } = JSON.parse(req.body);

    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
        FilterExpression: "user_id = :user_id AND bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
            ":user_id": aws.dynamo.input(turboardio_user_id),
        },
    });

    const pledge_id = Items.length ? Items[0].pledge_id : aws.dynamo.input(nanoid());

    let Item = {
        pledge_id,
        bounty_id: aws.dynamo.input(bounty_id),
        amount: aws.dynamo.input(amount),
        user_id: aws.dynamo.input(turboardio_user_id),
    } as {
        [key: string]: any;
    };

    await aws.dynamo.put_item({
        TableName: "turboardio_pledges",
        Item,
    });

    await res.revalidate(`/bounty/${bounty_id}`);

    res.status(200).json({ success: true });
};

export default withApiAuthRequired(create);
