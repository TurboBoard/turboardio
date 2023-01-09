import type { NextApiRequest, NextApiResponse } from "next";

import aws from "@Apis/aws";

import { TurboardioUser } from "@Types";

const get_details = async (req: NextApiRequest, res: NextApiResponse) => {
    const { turboardio_user_id } = JSON.parse(req.body);

    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: {
                S: turboardio_user_id,
            },
        },
    });

    const { image_id, pronouns, src_handle, twitch_handle, twitter_handle, user_id, user_name } = aws.dynamo.unmarshall(Item);

    const turboardio_user: TurboardioUser = {
        image_id,
        pronouns: pronouns || null,
        src_handle: src_handle || null,
        twitch_handle: twitch_handle || null,
        twitter_handle: twitter_handle || null,
        user_id,
        user_name,
    };

    res.status(200).json({
        turboardio_user,
    });
};

export default get_details;
