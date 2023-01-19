import type { NextApiRequest, NextApiResponse } from "next";

import aws from "@Apis/aws";

import { Bounty } from "@Types";

const get_game = async (game_id: number) => {
    const response = await fetch(process.env.IGDB_GAME_ENDPOINT, {
        method: "post",
        headers: {
            Accept: "application/json",
            "X-Turbo-Key": process.env.API_TOKEN,
        },
        body: JSON.stringify({
            game_id: game_id.toString(),
        }),
    });

    return await response.json();
};

const get_pledged = async (bounty_id: Bounty["id"]) => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    return Items.reduce((pledged, Item) => {
        const { amount } = aws.dynamo.unmarshall(Item);

        return pledged + amount;
    }, 0);
};

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    const { game_id } = JSON.parse(req.body);

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
        FilterExpression: "game_id = :game_id",
        ExpressionAttributeValues: {
            ":game_id": aws.dynamo.input(game_id),
        },
    });

    let bounties = [];

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const { bounty_id, claim_id, game_id } of sorted.slice(0, 10)) {
        const game = await get_game(game_id);

        const claimed = claim_id ? true : false;

        if (claimed) {
            bounties.push({
                claimed,
                game,
                id: bounty_id,
            });

            continue;
        }

        const pledged = await get_pledged(bounty_id);

        bounties.push({
            claimed,
            game,
            id: bounty_id,
            pledged,
        });
    }

    res.status(200).json({
        bounties,
    });
};

export default search;
