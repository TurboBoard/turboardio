import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/account/Index";

const Page = () => <Layout />;

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 1,
    };
}

export default withPageAuthRequired(Page);
