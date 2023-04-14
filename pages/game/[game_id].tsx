import aws from "@Apis/aws";

import get_bounties_item from "@Services/get_bounties_item";

import { GameHelper } from "@Helpers";

import Layout from "@Layouts/Game";

import { GameProps } from "@Props";

const Page = (props: GameProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params }: { params: { game_id: string } }) {
    const game_id = parseInt(params.game_id);

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
        FilterExpression: "game_id = :game_id",
        ExpressionAttributeValues: {
            ":game_id": aws.dynamo.input(game_id),
        },
    });

    const game = await GameHelper.get_game(game_id);

    const bounties: GameProps["bounties"] = [];

    const sorted: any[] = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const item of sorted) {
        const bounty_item = await get_bounties_item(item);

        bounties.push(bounty_item);
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
