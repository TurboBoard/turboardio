import aws from "@Apis/aws";

import Layout from "@Layouts/Bounty";

import { Bounty } from "@Types";
import { BountyProps } from "@Props";

import { convert } from "@Lib";

const Page = (props: BountyProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_admin = async (admin_id: string) => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(admin_id),
        },
    });

    return convert.turboardio_user(aws.dynamo.unmarshall(Item));
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

export async function getStaticProps({ params }: { params: { bounty_id: string } }) {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_bounties",
        Key: {
            bounty_id: aws.dynamo.input(params.bounty_id),
        },
    });

    const { admin_id, claim_id, bounty_id, details, game_id } = aws.dynamo.unmarshall(Item);

    const admin = await get_admin(admin_id);

    const game = await get_game(game_id);

    const pledged = await get_pledged(bounty_id);

    const props: BountyProps = {
        bounty: {
            admin,
            claimed: claim_id ? true : false,
            details,
            game,
            id: bounty_id,
            pledged,
        },
    };

    return {
        props,
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    const paths = Items.map((Item: any) => {
        const { bounty_id } = aws.dynamo.unmarshall(Item);

        return {
            params: {
                bounty_id,
            },
        };
    });

    return {
        paths,
        fallback: true,
    };
}

export default Page;
