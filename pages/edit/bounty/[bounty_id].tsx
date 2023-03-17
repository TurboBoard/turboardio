import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import get_bounty from "@Services/get_bounty";

import { Bounty } from "@Types";
import { EditBountyProps } from "@Props";

import Layout from "@Layouts/edit/Bounty";

const Page = (props: EditBountyProps) => {
    if (!props.bounty) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: Bounty["id"] } }) {
    const bounty: Bounty = await get_bounty(bounty_id);

    const props: EditBountyProps = {
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
