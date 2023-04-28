import Layout from "@Layouts/Zone";

const Page = (props: {}) => <Layout {...props} />;

export async function getStaticProps() {
    return {
        props: {
            meta: {
                description: "Watch in real time as runners achieve their personal bests.",
                title: "Turbo Zone",
                url: `https://turboboard.io/zone`,
            },
        },
        revalidate: 1,
    };
}

export default Page;
