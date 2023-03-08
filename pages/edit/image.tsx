import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/edit/Image";

import { EditImageProps } from "@Props";

const Page = (props: EditImageProps) => <Layout {...props} />;

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 1,
    };
}

export default withPageAuthRequired(Page);
