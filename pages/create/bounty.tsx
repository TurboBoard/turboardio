import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/create/Bounty";

import { CreateBountyProps } from "@Props";

const Page = (props: CreateBountyProps) => <Layout {...props} />;

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 1,
    };
}

export default withPageAuthRequired(Page);
