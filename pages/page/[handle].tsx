import contentful from "@Apis/contentful";

import Layout from "@Layouts/Page";

import { Entry } from "@Types";
import { PageProps } from "@Props";

const Page = (props: PageProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { handle } }: { params: { handle: string } }) {
    const { items } = await contentful.getEntries({
        content_type: "page",
        "fields.handle": handle,
        limit: 1,
    });

    const { fields }: Entry = items[0];

    const props: PageProps = {
        content: fields.content,
        meta: {
            title: fields.title,
            url: `https://turboboard.io/page/${handle}`,
        },
        title: fields.title,
    };

    return {
        props,
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const { items } = await contentful.getEntries({
        content_type: "page",
        limit: 10,
    });

    const paths = items.map(({ fields }: Entry) => ({
        params: {
            handle: fields.handle,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export default Page;
