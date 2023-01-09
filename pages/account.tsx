import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/Account";

import { AccountProps } from "@Props";

const Page = (props: AccountProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 1,
    };
}

export default withPageAuthRequired(Page);
