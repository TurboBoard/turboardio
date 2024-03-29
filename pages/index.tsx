import aws from "@Apis/aws";
import contentful from "@Apis/contentful";

import { TurboardioUserHelper } from "@Helpers";

import get_bounties_item from "@Services/get_bounties_item";

import { BountyHelper } from "@Helpers";

import Layout from "@Layouts/Index";

import { Entry, TurboardioUser } from "@Types";
import { HomeProps } from "@Props";

import { convert } from "@Lib";

const Page = (props: HomeProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_featured = async (): Promise<HomeProps["featured"]> => {
    const { fields }: Entry = await contentful.getEntry("1At94411COxnmsOMi8OtwB");

    const item = await BountyHelper.get_bounty(fields.featuredBounty);

    return await get_bounties_item(item);
};

const get_latest_winning_claim = async (): Promise<HomeProps["latest_winning_claim"]> => {
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

        const claims = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => b.amount - a.amount);

        const { amount, comment, link, user_id } = claims[0];

        if (!amount) continue;

        const video = convert.link_to_video(link);

        // If there is no video then we don't embed it on the homepage
        if (!video) continue;

        const user = await TurboardioUserHelper.get_turboardio_user(user_id);

        const latest_winning_claim = {
            comment,
            video,
            winner: {
                amount,
                user,
            },
        };

        return latest_winning_claim;
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

        const user = await TurboardioUserHelper.get_turboardio_user(user_id);

        users[user_id] = {
            amount,
            user,
        };
    }

    return Object.values(users)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 6);
};

export async function getStaticProps() {
    const featured = await get_featured();

    const latest_winning_claim = await get_latest_winning_claim();

    const leaderboard = await get_leaderboard();

    const props: HomeProps = {
        featured,
        latest_winning_claim,
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
