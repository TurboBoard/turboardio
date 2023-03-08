import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import { Bounty, Game } from "@Types";
import { AccountBountiesProps } from "@Props";

import { format } from "@Lib";

const get_game = async (game_id: Game["id"]): Promise<Game> => {
    const response = await fetch(process.env.IGDB_GAME_ENDPOINT, {
        method: "post",
        headers: {
            Accept: "application/json",
            "X-Turbo-Key": process.env.CLOUDFLARE_API_TOKEN,
        },
        body: JSON.stringify({
            game_id: game_id.toString(),
        }),
    });

    return await response.json();
};

const get_games = async (items): Promise<{ [key: number]: Game }> => {
    const games = {};

    for (const { game_id } of items) {
        if (games[game_id]) continue;

        games[game_id] = await get_game(game_id);
    }

    return games;
};

const get_is_claimed = async (bounty_id: Bounty["id"]): Promise<Bounty["is_claimed"]> => {
    const { Count } = await aws.dynamo.scan({
        TableName: "turboardio_winners",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    return Count > 0;
};

const get_bounties = async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = await getSession(req, res);

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
        FilterExpression: "admin_id = :admin_id",
        ExpressionAttributeValues: {
            ":admin_id": aws.dynamo.input(user.turboardio_user_id),
        },
    });

    if (!Items.length) {
        res.status(200).json({ bounties: [] });

        return;
    }

    const bounties: AccountBountiesProps["bounties"] = [];

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    const games = await get_games(sorted);

    for (const { bounty_id, created_at, game_id } of sorted) {
        const game = games[game_id];

        bounties.push({
            created_at: format.created_at(created_at),
            game,
            id: bounty_id,
            is_claimed: await get_is_claimed(bounty_id),
        });
    }

    res.status(200).json({ bounties });
};

export default withApiAuthRequired(get_bounties);
