const Page = () => <div>debug</div>;

import aws from "@Apis/aws";

import { nanoid } from "nanoid";

export async function getStaticProps() {
    // for (const { bounty_id, user_id, amount } of data) {
    //     const pledge_id = nanoid();

    //     await aws.dynamo.put_item({
    //         TableName: "turboardio_pledges",
    //         Item: {
    //             pledge_id: aws.dynamo.input(pledge_id),
    //             bounty_id: aws.dynamo.input(bounty_id),
    //             user_id: aws.dynamo.input(user_id),
    //             amount: aws.dynamo.input(amount),
    //         },
    //     });
    // }

    return {
        props: {},
        revalidate: 1,
    };
}

export default Page;
