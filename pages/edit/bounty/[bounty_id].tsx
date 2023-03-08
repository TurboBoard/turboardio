import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import { get_bounty } from "@Helpers";

import Layout from "@Layouts/edit/Bounty";

import { Bounty } from "@Types";
import { AccountBountyProps } from "@Props";

const Page = (props: AccountBountyProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: Bounty["id"] } }) {
    const bounty: Bounty = await get_bounty(bounty_id);

    const props: AccountBountyProps = {
        bounty,
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
