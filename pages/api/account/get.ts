import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import { convert } from "@Lib";

const get_user = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(turboardio_user_id),
        },
    });

    const turboardio_user = convert.turboardio_user(aws.dynamo.unmarshall(Item));

    res.status(200).json({
        turboardio_user,
    });
};

export default withApiAuthRequired(get_user);
