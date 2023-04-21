import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import aws from "@Apis/aws";

import get_bounty from "@Services/get_bounty";

import { Bounty, Claim } from "@Types";
import { DeleteClaimProps } from "@Props";

import Layout from "@Layouts/delete/Claim";

const Page = (props: DeleteClaimProps) => {
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

    const claim: Claim = bounty.claims.find(({ id }) => id === claim_id);

    const props: DeleteClaimProps = {
        bounty,
        claim,
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
