import aws from "@Apis/aws";

import Layout from "@Layouts/Game";

import { Game } from "@Types";
import { GameProps } from "@Props";

import { get_bounty } from "@Helpers";

const Page = (props: GameProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_game = async (game_id: Game["id"]): Promise<GameProps["game"]> => {
    const response = await fetch(process.env.IGDB_GAME_ENDPOINT, {
        method: "post",
        headers: {
            Accept: "application/json",
            "X-Turbo-Key": process.env.CLOUDFLARE_API_TOKEN,
        },
        body: JSON.stringify({
            game_id,
        }),
    });

    return await response.json();
};

const get_bounties = async (game_id: Game["id"]): Promise<GameProps["bounties"]> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
        FilterExpression: "game_id = :game_id",
        ExpressionAttributeValues: {
            ":game_id": aws.dynamo.input(game_id),
        },
    });

    let bounties = [];

    if (!Items.length) return bounties;

    const sorted = Items.map((Item) => {
        const { bounty_id, created_at } = aws.dynamo.unmarshall(Item);

        return {
            bounty_id,
            created_at,
        };
    }).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const { bounty_id } of sorted) {
        const bounty = await get_bounty(bounty_id);

        bounties.push(bounty);
    }

    return bounties;
};

export async function getStaticProps({ params }: { params: { game_id: string } }) {
    const game_id = parseInt(params.game_id);

    const game = await get_game(game_id);

    const bounties = await get_bounties(game_id);

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
