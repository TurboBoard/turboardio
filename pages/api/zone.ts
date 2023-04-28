import type { NextApiRequest, NextApiResponse } from "next";

const get_data = async (): Promise<{ currentlyStreaming: boolean; delta: number; user: string }[]> => {
    const response = await fetch(`https://therun.gg/api/live`);

    return await response.json();
};

const zone = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await get_data();

    const sorted = data.sort((a, b) => a.delta - b.delta);

    const { user } = sorted.find((e) => e.currentlyStreaming);

    res.status(200).json({ twitch_channel: user });
};

export default zone;
