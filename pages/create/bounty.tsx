import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/create/Bounty";

import { CreateBountyProps } from "@Props";

const Page = (props: CreateBountyProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps() {
    const props: CreateBountyProps = {
        meta: {
            description: "Search through 200,000+ video games for your favourite game and add a bounty to the bounty board.",
            title: "Create a Bounty",
            url: "https://turboboard.io/create/bounty",
        },
    };

    return {
        props,
        revalidate: 1,
    };
}

export default withPageAuthRequired(Page);
