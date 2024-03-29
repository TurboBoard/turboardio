import type { NextApiRequest, NextApiResponse } from "next";

import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import { nanoid } from "nanoid";
import sharp from "sharp";

import { User } from "@Types";

const create_turboardio_user = async ({ name, nickname, picture, sub }: User): Promise<User["turboardio_user_id"]> => {
    const user_id = nanoid();

    const user_name = nickname || name;

    await aws.dynamo.put_item({
        TableName: "turboardio_users",
        Item: {
            auth0_sub: aws.dynamo.input(sub),
            user_id: aws.dynamo.input(user_id),
            user_name: aws.dynamo.input(user_name),
        },
    });

    await process_image(picture, user_id);

    return user_id;
};

const get_turboardio_user_id = async (sub: User["sub"]): Promise<User["turboardio_user_id"]> => {
    try {
        const { Items } = await aws.dynamo.scan({
            TableName: "turboardio_users",
            FilterExpression: "auth0_sub = :auth0_sub",
            ExpressionAttributeValues: {
                ":auth0_sub": aws.dynamo.input(sub),
            },
        });

        if (Items.length === 0) return null;

        const { user_id } = aws.dynamo.unmarshall(Items[0]);

        return user_id;
    } catch {
        return null;
    }
};

const process_image = async (picture: User["picture"], user_id: User["turboardio_user_id"]) => {
    if (!picture) return null;

    const response = await fetch(picture);

    const arrayBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const Body = await sharp(buffer).resize(256).jpeg().toBuffer();

    await aws.s3.upload({
        Bucket: "turboardio-user-images",
        Key: `${user_id}.jpg`,
        Body,
        ContentType: "image/jpeg",
    });
};

const afterCallback = async (req: NextApiRequest, res: NextApiResponse<any>, session: any) => {
    // // We store their user_id in the session so that any additional calls will get their turboboard UUID directly from the session
    // const turboardio_user_id = await get_turboardio_user_id(session.user.sub);
    const turboardio_user_id = await get_turboardio_user_id(session.user.sub);

    if (turboardio_user_id) {
        session.user.turboardio_user_id = turboardio_user_id;

        return session;
    }

    const new_turboardio_user_id = await create_turboardio_user(session.user);

    session.user.turboardio_user_id = new_turboardio_user_id;

    return session;
};

export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error) {
            res.status(error.status || 500).end(error.message);
        }
    },
    async login(req, res) {
        await handleLogin(req, res, {
            returnTo: req.headers.referer,
        });
    },
});
