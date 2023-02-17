import aws from "@Apis/aws";

import { get_bounty } from "@Helpers";

import Layout from "@Layouts/Bounty";

import { Bounty } from "@Types";
import { BountyProps } from "@Props";

const Page = (props: BountyProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: Bounty["id"] } }) {
    const bounty: Bounty = await get_bounty(bounty_id);

    let meta_description = `${bounty.game.title} bounty.`;

    if (bounty.prize) {
        meta_description = ` Prize: $${bounty.prize}`;
    }

    if (bounty.winning_claim) {
        meta_description += ` Bounty has been claimed by ${bounty.winning_claim.user.name}.`;
    }

    const props: BountyProps = {
        bounty,
        meta: {
            description: meta_description,
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
