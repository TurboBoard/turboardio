import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import aws from "@Apis/aws";

import get_bounty from "@Services/get_bounty";

import { Bounty, Pledge } from "@Types";
import { EditPledgeProps } from "@Props";

import Layout from "@Layouts/edit/Pledge";

const Page = (props: EditPledgeProps) => {
    if (!props.bounty) return null;

    return <Layout {...props} />;
};

const get_bounty_id = async (pledge_id: Pledge["id"]) => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_pledges",
        Key: {
            pledge_id: aws.dynamo.input(pledge_id),
        },
    });

    const { bounty_id } = aws.dynamo.unmarshall(Item);

    return bounty_id;
};

export async function getStaticProps({ params: { pledge_id } }: { params: { pledge_id: Pledge["id"] } }) {
    const bounty_id = await get_bounty_id(pledge_id);

    const bounty: Bounty = await get_bounty(bounty_id);

    const pledge: Pledge = bounty.pledges.find(({ id }) => id === pledge_id);

    const props: EditPledgeProps = {
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
