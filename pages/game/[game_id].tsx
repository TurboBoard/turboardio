import aws from "@Apis/aws";

import { ClaimHelper, GameHelper, PledgeHelper, TurboardioUserHelper } from "@Helpers";

import Layout from "@Layouts/Game";

import { GameProps } from "@Props";

import { format } from "@Lib";

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

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const { admin_id, bounty_id, created_at } of sorted) {
        const admin = await TurboardioUserHelper.get_turboardio_user(admin_id);

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
