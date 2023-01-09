const Page = () => <div>debug</div>;

import aws from "@Apis/aws";

export async function getStaticProps() {
    // for (const {id, image_id, name, user_sub} of data) {
    //     await aws.dynamo.put_item({
    //         TableName: "turboardio_users",
    //         Item: {
    //             auth0_sub: aws.dynamo.input(user_sub),
    //             image_id: aws.dynamo.input(image_id),
    //             user_id: aws.dynamo.input(id),
    //             name: aws.dynamo.input(name),
    //         },
    //     });
    // }

    return {
        props: {},
        revalidate: 1,
    };
}

export default Page;
