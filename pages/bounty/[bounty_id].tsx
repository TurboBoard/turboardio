import aws from "@Apis/aws";

import get_bounty from "@Services/get_bounty";

import Layout from "@Layouts/Bounty";

import { Bounty } from "@Types";
import { BountyProps } from "@Props";

const Page = (props: BountyProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: Bounty["id"] } }) {
    const bounty: Bounty = await get_bounty(bounty_id);

    let description = bounty.details.substring(0, 200);

    if (bounty.amount) {
        description = ` Prize: $${bounty.amount}`;
    }

    if (bounty.is_claimed) {
        const winners = bounty.claims
            .reduce((acc, { is_winner, user }) => {
                if (!is_winner) return acc;

                acc.push(user.name);

                return acc;
            }, [] as string[])
            .join(", ");

        description += ` Bounty has been claimed by ${winners}.`;
    }

    const props: BountyProps = {
        bounty,
        meta: {
            description,
            title: `${bounty.game.title} Bounty`,
            url: `https://turboboard.io/bounty/${bounty.id}`,
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

    const paths = Items.map((Item) => {
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
