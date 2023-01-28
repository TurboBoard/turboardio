import aws from "@Apis/aws";

import Layout from "@Layouts/Game";

import { Bounty, Game, TurboardioUser } from "@Types";
import { GameProps } from "@Props";

import { format } from "@Lib";

type Item = {
    admin_id: string;
    bounty_id: string;
    claim_id: string;
    created_at: string;
};

const Page = (props: GameProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_admin = async (admin_id: TurboardioUser["id"]): Promise<{ id: TurboardioUser["id"]; name: TurboardioUser["name"] }> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(admin_id),
        },
    });

    const { user_id, user_name } = aws.dynamo.unmarshall(Item);

    return {
        id: user_id,
        name: user_name,
    };
};

const get_items = async (game_id: Game["id"]): Promise<Item[] | null> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
        FilterExpression: "game_id = :game_id",
        ExpressionAttributeValues: {
            ":game_id": aws.dynamo.input(game_id),
        },
    });

    if (!Items.length) return [];

    return Items.map((Item) => {
        const { admin_id, bounty_id, claim_id, created_at } = aws.dynamo.unmarshall(Item);

        return {
            admin_id,
            bounty_id,
            claim_id,
            created_at,
        };
    });
};

const get_game = async (game_id: Game["id"]): Promise<GameProps["game"]> => {
    const response = await fetch(process.env.IGDB_GAME_ENDPOINT, {
        method: "post",
        headers: {
            Accept: "application/json",
            "X-Turbo-Key": process.env.API_TOKEN,
        },
        body: JSON.stringify({
            game_id,
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

    return Items.map((Item) => {
        const { amount, pledge_id, user_id } = aws.dynamo.unmarshall(Item);

        return {
            amount,
            id: pledge_id,
            user_id,
        };
    });
};

export async function getStaticProps({ params }: { params: { game_id: string } }) {
    const game_id = parseInt(params.game_id);

    const game = await get_game(game_id);

    const items = await get_items(game_id);

    let bounties = [];

    const sorted = items.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const { admin_id, bounty_id, claim_id, created_at } of sorted) {
        const admin = await get_admin(admin_id);

        const claimed = claim_id ? true : false;

        const pledges = await get_pledges(bounty_id);

        bounties.push({
            admin,
            claimed,
            created_at: format.created_at(created_at),
            game,
            id: bounty_id,
            pledges,
        });
    }

    const props: GameProps = {
        bounties,
        game,
        meta: {
            description: `View all ${game.title} bounties.`,
            title: `${game.title} Bounties`,
            url: `https://turboboard.io/game/${game.id}`,
        },
    };

    return {
        props,
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export default Page;
