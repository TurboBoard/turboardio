import Layout from "@Layouts/Home";

import { HomeProps } from "@Props";

const Page = (props: HomeProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps() {
    const props: HomeProps = {
        meta: {
            description: "Video Game Bounty Board. Create/Pledge/Claim.",
            url: "https://turboboard.io",
        },
    };

    return {
        props,
        revalidate: 60,
    };
}

export default Page;
