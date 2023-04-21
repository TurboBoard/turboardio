import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import aws from "@Apis/aws";

import get_bounty from "@Services/get_bounty";

import Layout from "@Layouts/delete/Pledge";

import { Bounty, Pledge } from "@Types";
import { DeletePledgeProps } from "@Props";

const Page = (props: DeletePledgeProps) => {
    if (!props.bounty) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { pledge_id } }: { params: { pledge_id: string } }) {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_pledges",
        Key: {
            pledge_id: aws.dynamo.input(pledge_id),
        },
    });

    const { amount, bounty_id, user_id } = aws.dynamo.unmarshall(Item);

    const pledge: Pledge = {
        amount,
        id: pledge_id,
        user_id,
    };

    const bounty: Bounty = await get_bounty(bounty_id);

    const props: DeletePledgeProps = {
        bounty,
        pledge,
    };

    return {
        props,
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export default withPageAuthRequired(Page);
