import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/account/Account";

import { AccountProps } from "@Props";

const Page = (props: AccountProps) => <Layout {...props} />;

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 1,
    };
}

export default withPageAuthRequired(Page);
