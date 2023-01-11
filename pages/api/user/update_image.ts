import fs from "fs";

import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import multiparty from "multiparty";
import sharp from "sharp";

import aws from "@Apis/aws";

// TODO: Figure out why I need this, I copied it over from v2
export const config = {
    api: {
        bodyParser: false,
    },
};

const parse_form = (req: NextApiRequest): Promise<string> =>
    new Promise((resolve, reject) => {
        const form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);

            return resolve(files.file[0].path);
        });
    });

const update_image = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {
            user: { turboardio_user_id },
        } = await getSession(req, res);

        const image_path: string = await parse_form(req);

        const file_content = fs.readFileSync(image_path);

        const buffer = await sharp(file_content).resize(256).jpeg().toBuffer();

        const Key = `${turboardio_user_id}.jpg`;

        await aws.s3.upload({
            Bucket: "turboardio-user-images",
            Key,
            Body: buffer,
            ContentType: "image/jpeg",
        });

        await aws.cloudfront.create_invalidation({
            DistributionId: "E12M01XLSAA1YR",
            InvalidationBatch: {
                CallerReference: Date.now().toString(),
                Paths: {
                    Quantity: 1,
                    Items: [`/${Key}`],
                },
            },
        });

        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export default withApiAuthRequired(update_image);
