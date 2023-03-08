import aws from "@Apis/aws";

import Layout from "@Layouts/Index";

import { Claim, TurboardioUser } from "@Types";
import { HomeProps } from "@Props";

import { convert } from "@Lib";

const Page = (props: HomeProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_latest_winning_claim = async (): Promise<HomeProps["claim"]> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const item of sorted) {
        const { Count, Items } = await aws.dynamo.scan({
            TableName: "turboardio_claims",
            FilterExpression: "bounty_id = :bounty_id",
            ExpressionAttributeValues: {
                ":bounty_id": aws.dynamo.input(item.bounty_id),
            },
        });

        if (Count === 0) continue;

        const { claim_id, created_at, comment, link, user_id } = aws.dynamo.unmarshall(Items[0]);

        const user = await get_user(user_id);

        const video = convert.link_to_video(link);

        // If there is no video then we don't embed it on the homepage
        if (!video) continue;

        return {
            comment,
            created_at,
            id: claim_id,
            link,
            user,
            video,
        };
    }
};

const get_leaderboard = async (): Promise<HomeProps["leaderboard"]> => {
    const users: {
        [user_id: TurboardioUser["id"]]: {
            amount: number;
            user: TurboardioUser;
        };
    } = {};

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_claims",
    });

    for (const Item of Items) {
        const { amount, user_id } = aws.dynamo.unmarshall(Item);

        if (!amount) continue;

        if (users[user_id]) {
            users[user_id].amount += parseInt(amount);

            continue;
        }

        const user = await get_user(user_id);

        users[user_id] = {
            amount,
            user,
        };
    }

    return Object.values(users)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
};

const get_user = async (turboardio_id: TurboardioUser["id"]): Promise<TurboardioUser> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(turboardio_id),
        },
    });

    return convert.turboardio_user(aws.dynamo.unmarshall(Item));
};

export async function getStaticProps() {
    const latest_winning_claim: Claim = await get_latest_winning_claim();

    const leaderboard = await get_leaderboard();

    const props: HomeProps = {
        claim: latest_winning_claim,
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
