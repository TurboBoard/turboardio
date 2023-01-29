import aws from "@Apis/aws";

import { Bounty, Game, TurboardioUser } from "@Types";

import type { NextApiRequest, NextApiResponse } from "next";

const get_games = async (items: any): Promise<{ [key: string]: Game }> => {
    const games = {};

    for (const item of items) {
        if (games[item.game_id]) continue;

        const response = await fetch(process.env.IGDB_GAME_ENDPOINT, {
            method: "post",
            headers: {
                Accept: "application/json",
                "X-Turbo-Key": process.env.CLOUDFLARE_API_TOKEN,
            },
            body: JSON.stringify({
                game_id: item.game_id.toString(),
            }),
        });

        games[item.game_id] = await response.json();
    }

    return games;
};

const get_pledges = async (): Promise<{ [key: string]: Bounty["pledges"] }> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
    });

    const pledges = {};

    for (const Item of Items) {
        const { amount, bounty_id, pledge_id, user_id } = aws.dynamo.unmarshall(Item);

        if (!pledges[bounty_id]) {
            pledges[bounty_id] = [];
        }

        pledges[bounty_id].push({
            amount,
            id: pledge_id,
            user_id,
        });
    }

    return pledges;
};

const get_users = async (): Promise<{ [key: string]: { id: TurboardioUser["id"]; name: TurboardioUser["name"] } }> => {
    const users = {};

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_users",
    });

    for (const Item of Items) {
        const { user_id, user_name } = aws.dynamo.unmarshall(Item);

        const user = {
            id: user_id,
            name: user_name,
        };

        if (users[user.id]) continue;

        users[user.id] = user;
    }

    return users;
};

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let bounties = [];

        const { Items } = await aws.dynamo.scan({
            TableName: "turboardio_bounties",
        });

        const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item))
            .sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
            .slice(0, 5);

        const games = await get_games(sorted);

        const pledges = await get_pledges();

        const users = await get_users();

        for (const { admin_id, bounty_id, claim_id, created_at, game_id } of sorted) {
            const admin = users[admin_id];

            const claimed = claim_id ? true : false;

            const game = games[game_id];

            const split = created_at.split("T")[0].split("-");

            bounties.push({
                admin,
                claimed,
                created_at: `${split[1]}/${split[2]}/${split[0]}`,
                game,
                id: bounty_id,
                pledges: pledges[bounty_id] || null,
            });
        }

        res.status(200).json({ bounties });
    } catch (err) {
        console.log("err", err);

        res.status(200).json({ err });
    }
};

export default search;
