import Layout from "@Layouts/Zone";

const Page = (props: {}) => <Layout {...props} />;

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 1,
    };
}

export default Page;
