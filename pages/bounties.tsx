import aws from "@Apis/aws";

import Layout from "@Layouts/Bounties";

import { Bounty, Game, TurboardioUser } from "@Types";
import { BountiesProps } from "@Props";

const Page = (props: BountiesProps) => {
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

const get_game = async (game_id: number): Promise<Game> => {
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

    return Items.map((Item) => {
        const { amount, pledge_id, user_id } = aws.dynamo.unmarshall(Item);

        return {
            amount,
            id: pledge_id,
            user_id,
        };
    });
};

export async function getStaticProps() {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    let bounties = [];

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const { admin_id, bounty_id, claim_id, created_at, game_id } of sorted) {
        const admin = await get_admin(admin_id);

        const claimed = claim_id ? true : false;

        const game = await get_game(game_id);

        const pledges = await get_pledges(bounty_id);

        const split = created_at.split("T")[0].split("-");

        bounties.push({
            admin,
            claimed,
            created_at: `${split[1]}/${split[2]}/${split[0]}`,
            game,
            id: bounty_id,
            pledges,
        });
    }

    const props: BountiesProps = {
        bounties,
        meta: {
            description: "View the latest bounties or search for your favourite game.",
            title: "Latest bounties",
            url: `https://turboboard.io/bounties`,
        },
    };

    return {
        props,
        revalidate: 60,
    };
}

export default Page;
