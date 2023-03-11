import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import { TurboardioUserHelper } from "@Helpers";

const get_user = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const turboardio_user = await TurboardioUserHelper.get_turboardio_user(turboardio_user_id);

    res.status(200).json({
        turboardio_user,
    });
};

export default withApiAuthRequired(get_user);
