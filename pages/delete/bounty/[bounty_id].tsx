import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import get_bounty from "@Services/get_bounty";

import { Bounty, Claim } from "@Types";
import { DeleteBountyProps } from "@Props";

import Layout from "@Layouts/delete/Bounty";

const Page = (props: DeleteBountyProps) => {
    if (!props.bounty) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: Claim["id"] } }) {
    const bounty: Bounty = await get_bounty(bounty_id);

    const props: DeleteBountyProps = {
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
