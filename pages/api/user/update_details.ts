import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import { TurboardioUser } from "@Types";

const character_limit = 64;

const update_details = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getSession(req, res);

        const { image_id, pronouns, src_handle, twitch_handle, twitter_handle, user_id, user_name }: TurboardioUser = JSON.parse(req.body);

        if (user_id !== session.user.turboardio_user_id) {
            throw new Error("Invalid user");
        }

        let Item = {
            auth0_sub: aws.dynamo.input(session.user.sub),
            image_id: aws.dynamo.input(image_id),
            user_id: aws.dynamo.input(user_id),
            user_name: aws.dynamo.input(user_name),
        } as {
            auth0_sub: any;
            image_id: any;
            pronouns?: any;
            src_handle?: any;
            twitch_handle?: any;
            twitter_handle?: any;
            user_id: any;
            user_name: any;
        };

        if (pronouns) {
            Item.pronouns = aws.dynamo.input(pronouns.substring(0, character_limit));
        }

        if (src_handle) {
            Item.src_handle = aws.dynamo.input(src_handle.substring(0, character_limit));
        }
        if (twitch_handle) {
            Item.twitch_handle = aws.dynamo.input(twitch_handle.substring(0, character_limit));
        }
        if (twitter_handle) {
            Item.twitter_handle = aws.dynamo.input(twitter_handle.substring(0, character_limit));
        }

        await aws.dynamo.put_item({
            TableName: "turboardio_users",
            Item,
        });

        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export default withApiAuthRequired(update_details);
