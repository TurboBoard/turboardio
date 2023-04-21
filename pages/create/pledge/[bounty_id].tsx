import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import get_bounty from "@Services/get_bounty";

import Layout from "@Layouts/create/Pledge";

import { Bounty } from "@Types";
import { CreatePledgeProps } from "@Props";

const Page = (props: CreatePledgeProps) => {
    if (!props.bounty) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: string } }) {
    const bounty: Bounty = await get_bounty(bounty_id);

    let description = bounty.details.substring(0, 200);

    const props: CreatePledgeProps = {
        bounty,
        meta: {
            description,
            title: `Pledge ${bounty.game.title} Bounty`,
            url: `https://turboboard.io/create/pledge/${bounty.id}`,
        },
    };

    return {
        props,
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export default withPageAuthRequired(Page);
