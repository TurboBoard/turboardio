const Page = () => <div>debug</div>;

import aws from "@Apis/aws";

import { nanoid } from "nanoid";

const data = [];

export async function getStaticProps() {
    // for (const { bounty_id, claim_id, created_at, comment, link, user_id } of data) {
    //     let Item = {
    //         claim_id: aws.dynamo.input(claim_id),
    //         bounty_id: aws.dynamo.input(bounty_id),
    //         user_id: aws.dynamo.input(user_id),
    //         created_at: aws.dynamo.input(new Date(created_at).toISOString()),
    //         link: aws.dynamo.input(link),
    //     };

    //     if (comment) {
    //         Item.comment = aws.dynamo.input(comment);
    //     }

    //     await aws.dynamo.put_item({
    //         TableName: "turboardio_claims",
    //         Item,
    //     });
    // }

    //
    //
    // KS_2oTbRdYJSF1N0HX9y2

    return {
        props: {},
        revalidate: 1,
    };
}

export default Page;
