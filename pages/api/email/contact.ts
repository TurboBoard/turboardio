import aws from "@Apis/aws";

import type { NextApiRequest, NextApiResponse } from "next";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, message } = JSON.parse(req.body);

    const params = {
        Destination: {
            ToAddresses: ["hello@turboboard.io"],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<p>A user has reached out via <a href="https://turboboard.io/" target="_blank">TurboBoard.io</a></p>
                    <p><strong>Email:</strong> ${email}<br />
                    <strong>Message:</strong> ${message}<br /></p>`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Contact Form",
            },
        },
        Source: "Turboboard.io <admin@turboboard.io>",
    };

    await aws.ses.send_email(params);

    res.status(200).json({ success: true });
};

export default search;
