import type { NextApiRequest, NextApiResponse } from "next";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    const { platform, query, year } = JSON.parse(req.body);

    const response = await fetch(process.env.IGDB_SEARCH_ENDPOINT, {
        method: "post",
        headers: {
            Accept: "application/json",
            "X-Turbo-Key": process.env.CLOUDFLARE_API_TOKEN,
        },
        body: JSON.stringify({
            platform,
            query,
            year,
        }),
    });

    const json = await response.json();

    res.status(200).json(json);
};

export default search;
