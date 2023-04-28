import type { NextApiRequest, NextApiResponse } from "next";

const get_data = async (): Promise<{ delta: number; user: string }[]> => {
    const response = await fetch(`https://therun.gg/api/live`);

    return await response.json();
};

const zone = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await get_data();

    const sorted = data.sort((a, b) => a.delta - b.delta);

    res.status(200).json({ twitch_channel: sorted[0].user });
};

export default zone;
