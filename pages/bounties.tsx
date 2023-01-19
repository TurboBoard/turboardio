import aws from "@Apis/aws";

import Layout from "@Layouts/Bounties";

import { Bounty } from "@Types";
import { BountiesProps } from "@Props";

const Page = (props: BountiesProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

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

const get_pledges = async (bounty_id: Bounty["id"]) => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Items.length) return null;

    return Items.map((Item) => {
        const { amount, user_id } = aws.dynamo.unmarshall(Item);

        return {
            amount,
            user_id,
        };
    });
};

export async function getStaticProps() {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    let bounties = [];

    for (const Item of Items) {
        const { bounty_id, claim_id, game_id } = aws.dynamo.unmarshall(Item);

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

        const pledges = await get_pledges(bounty_id);

        bounties.push({
            claimed,
            game,
            id: bounty_id,
            pledges,
        });
    }

    return {
        props: {
            bounties,
        },
        revalidate: 10,
    };
}

export default Page;
