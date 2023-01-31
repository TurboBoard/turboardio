import aws from "@Apis/aws";

import { get_bounty } from "@Helpers";

import Layout from "@Layouts/Home";

import { Bounty, Claim, TurboardioUser } from "@Types";
import { HomeProps } from "@Props";

import { convert } from "@Lib";

const Page = (props: HomeProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_prize = async (bounty_id: Bounty["id"]): Promise<number> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    return Items.reduce((prize, Item) => {
        const { amount } = aws.dynamo.unmarshall(Item);

        return (prize += amount);
    }, 0);
};

const get_user = async (user_id: TurboardioUser["id"]): Promise<TurboardioUser> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(user_id),
        },
    });

    return convert.turboardio_user(aws.dynamo.unmarshall(Item));
};

const get_user_id = async (claim_id: Claim["id"]): Promise<TurboardioUser["id"]> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_claims",
        Key: {
            claim_id: aws.dynamo.input(claim_id),
        },
    });

    const { user_id } = aws.dynamo.unmarshall(Item);

    return user_id;
};

const get_leaderboard = async (Items: {}[]) => {
    const users: {
        [user_id: TurboardioUser["id"]]: {
            prize: number;
            user: TurboardioUser;
        };
    } = {};

    for (const Item of Items) {
        const { bounty_id, claim_id } = aws.dynamo.unmarshall(Item);

        if (!claim_id) continue;

        const user_id = await get_user_id(claim_id);

        let prize = await get_prize(bounty_id);

        if (users[user_id]) {
            users[user_id].prize += prize;

            continue;
        }

        const user = await get_user(user_id);

        users[user_id] = {
            user,
            prize,
        };
    }

    return Object.values(users)
        .sort((a, b) => b.prize - a.prize)
        .slice(0, 5);
};

export async function getStaticProps() {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    const leaderboard = await get_leaderboard(Items);

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item))
        .sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        .filter(({ claim_id }) => claim_id);

    const { winning_claim } = await get_bounty(sorted[0].bounty_id);

    const props: HomeProps = {
        claim: winning_claim,
        leaderboard,
        meta: {
            description: "Video Game Bounty Board. Create/Pledge/Claim.",
            url: "https://turboboard.io",
        },
    };

    return {
        props,
        revalidate: 60,
    };
}

export default Page;
