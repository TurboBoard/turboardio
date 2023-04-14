import aws from "@Apis/aws";

import get_bounties_item from "@Services/get_bounties_item";

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

    const sorted: any[] = Items.map((Item) => aws.dynamo.unmarshall(Item))
        .sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        .slice(0, 7);

    const bounties: BountiesProps["bounties"] = [];

    for (const item of sorted) {
        const bounty_item = await get_bounties_item(item);

        bounties.push(bounty_item);
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
