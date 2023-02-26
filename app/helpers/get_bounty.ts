import aws from "@Apis/aws";

import { Bounty, Game, TurboardioUser } from "@Types";

import { convert, format } from "@Lib";

const get_claims = async (bounty_id: Bounty["id"]): Promise<Bounty["claims"]> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_claims",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Items.length) return null;

    const claims = [];

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const { comment, created_at, claim_id, link, user_id } of sorted) {
        const user = await get_user(user_id);

        claims.push({
            comment: comment || null,
            created_at: format.created_at(created_at),
            id: claim_id,
            link,
            user,
        });
    }

    return claims;
};

const get_game = async (game_id: Game["id"]): Promise<Bounty["game"]> => {
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

const get_pledges = async (bounty_id: Bounty["id"]): Promise<Bounty["pledges"]> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Items.length) return null;

    const pledges = [];

    for (const Item of Items) {
        const { amount, pledge_id, user_id } = aws.dynamo.unmarshall(Item);

        pledges.push({
            amount,
            id: pledge_id,
            user_id,
        });
    }

    return pledges;
};

const get_user = async (admin_id: TurboardioUser["id"]): Promise<TurboardioUser> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(admin_id),
        },
    });

    return convert.turboardio_user(aws.dynamo.unmarshall(Item));
};

const get_winners = async (bounty_id: Bounty["id"], claims: Bounty["claims"]): Promise<Bounty["winners"]> => {
    if (!claims) return null;

    const { Count, Items } = await aws.dynamo.scan({
        TableName: "turboardio_winners",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Count) return null;

    const winners: Bounty["winners"] = [];

    for (const Item of Items) {
        const { amount, bounty_id, claim_id } = aws.dynamo.unmarshall(Item);

        const claim = claims.find(({ id }) => id === claim_id);

        winners.push({
            amount,
            user: claim.user,
        });
    }

    return winners;
};

const get_bounty = async (bounty_id: Bounty["id"]): Promise<Bounty> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_bounties",
        Key: {
            bounty_id: aws.dynamo.input(bounty_id),
        },
    });

    const { admin_id, created_at, details, discord_link, end_date, game_id, start_date } = aws.dynamo.unmarshall(Item);

    const admin = await get_user(admin_id);

    const game = await get_game(game_id);

    const pledges = await get_pledges(bounty_id);

    const amount = pledges ? pledges.reduce((acc, { amount }) => acc + amount, 0) : null;

    const claims = await get_claims(bounty_id);

    const winners = await get_winners(bounty_id, claims);

    const bounty: Bounty = {
        admin,
        amount,
        claims,
        created_at: format.created_at(created_at),
        details,
        discord_link: discord_link || null,
        end_date: end_date || null,
        game,
        id: bounty_id,
        pledges,
        start_date: start_date || null,
        winners,
    };

    return bounty;
};

export default get_bounty;
