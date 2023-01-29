import Layout from "@Layouts/Bounties";

import { BountiesProps } from "@Props";

const Page = (props: BountiesProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps() {
    const props: BountiesProps = {
        meta: {
            description: "View the latest bounties or search for your favourite game.",
            title: "Latest bounties",
            url: `https://turboboard.io/bounties`,
        },
    };

    return {
        props,
        revalidate: 60,
    };
}

export default Page;
