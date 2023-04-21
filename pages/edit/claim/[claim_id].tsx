// @ts-nocheck
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import aws from "@Apis/aws";

import get_bounty from "@Services/get_bounty";

import { Bounty, Claim } from "@Types";
import { EditClaimProps } from "@Props";

import Layout from "@Layouts/edit/Claim";

const Page = (props: EditClaimProps) => {
    if (!props.bounty) return null;

    return <Layout {...props} />;
};

const get_bounty_id = async (claim_id: Claim["id"]) => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_claims",
        Key: {
            claim_id: aws.dynamo.input(claim_id),
        },
    });

    const { bounty_id } = aws.dynamo.unmarshall(Item);

    return bounty_id;
};

export async function getStaticProps({ params: { claim_id } }: { params: { claim_id: Claim["id"] } }) {
    const bounty_id = await get_bounty_id(claim_id);

    const bounty: Bounty = await get_bounty(bounty_id);

    // todo; g et bounty and claim

    // // console.log(bounty);

    // const props: EditClaimProps = {
    //     bounty,
    // };

    return {
        props: {},
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
