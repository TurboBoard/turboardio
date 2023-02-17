import Layout from "@Layouts/Search";

const Page = (props: {}) => <Layout {...props} />;

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 1,
    };
}

export default Page;
