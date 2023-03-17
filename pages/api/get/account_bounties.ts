import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import { ClaimHelper, GameHelper, PledgeHelper, TurboardioUserHelper } from "@Helpers";

import { Game } from "@Types";
import { AccountBountiesProps } from "@Props";

import { format } from "@Lib";

const get_games = async (items): Promise<{ [key: number]: Game }> => {
    const games = {};

    for (const { game_id } of items) {
        if (games[game_id]) continue;

        games[game_id] = await GameHelper.get_game(game_id);
    }

    return games;
};

const get_bounties = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
        FilterExpression: "admin_id = :admin_id",
        ExpressionAttributeValues: {
            ":admin_id": aws.dynamo.input(turboardio_user_id),
        },
    });

    const bounties: AccountBountiesProps["bounties"] = [];

    if (!Items.length) {
        res.status(200).json({ bounties });

        return;
    }

    const items = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    const admin = await TurboardioUserHelper.get_turboardio_user(turboardio_user_id);

    const games = await get_games(items);

    for (const { bounty_id, created_at, game_id } of items) {
        const game = games[game_id];

        const is_claimed = await ClaimHelper.get_is_claimed(bounty_id);

        const pledges = await PledgeHelper.get_pledges(bounty_id);

        bounties.push({
            admin: {
                id: admin.id,
                name: admin.name,
            },
            amount: pledges ? pledges.reduce((acc, { amount }) => (acc += amount), 0) : null,
            created_at: format.iso(created_at),
            game,
            id: bounty_id,
            is_claimed,
            pledges,
        });
    }

    res.status(200).json({ bounties });
};

export default withApiAuthRequired(get_bounties);
