import { nanoid } from "nanoid";

const Page = () => <div>debug</div>;

export async function getStaticProps() {
    console.log(nanoid());
    return {
        props: {},
    };
}

export default Page;
