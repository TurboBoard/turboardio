import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/edit/Details";

import { EditDetailsProps } from "@Props";

const Page = (props: EditDetailsProps) => <Layout {...props} />;

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 1,
    };
}

export default withPageAuthRequired(Page);
