import aws from "@Apis/aws";

import { get_bounty } from "@Helpers";

import Layout from "@Layouts/Bounties";

import { BountiesProps } from "@Props";

const Page = (props: BountiesProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps() {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    let bounties: BountiesProps["bounties"] = [];

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item))
        .sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        .slice(0, 5);

    for (const { bounty_id } of sorted) {
        const { admin, amount, created_at, game, id, pledges, winners } = await get_bounty(bounty_id);

        bounties.push({
            admin,
            amount,
            created_at,
            id,
            is_claimed: winners?.length > 0 ? true : false,
            game,
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
