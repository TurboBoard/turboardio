import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import { TurboardioUser } from "@Types";

const character_limit = 64;

const update_details = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {
            user: { sub, turboardio_user_id },
        } = await getSession(req, res);

        const body: TurboardioUser = JSON.parse(req.body);

        let Item = {
            auth0_sub: aws.dynamo.input(sub),
            user_id: aws.dynamo.input(turboardio_user_id),
            user_name: aws.dynamo.input(body.user_name),
        };

        for (const key of ["pronouns", "src_handle", "twitch_handle", "twitter_handle"]) {
            if (body[key]) {
                Item[key] = aws.dynamo.input(body[key].substring(0, character_limit));
            }
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
