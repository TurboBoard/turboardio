import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import get_bounty from "@Services/get_bounty";

import Layout from "@Layouts/create/Claim";

import { Bounty } from "@Types";
import { CreateClaimProps } from "@Props";

const Page = (props: CreateClaimProps) => {
    if (!props.bounty) return null;

    return <Layout {...props} />;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: string } }) {
    const bounty: Bounty = await get_bounty(bounty_id);

    let description = bounty.details.substring(0, 200);

    if (bounty.amount) {
        description = ` Prize: $${bounty.amount}`;
    }

    if (bounty.is_claimed) {
        const winners = bounty.claims
            .reduce((acc, { is_winner, user }) => {
                if (!is_winner) return acc;

                acc.push(user.name);

                return acc;
            }, [] as string[])
            .join(", ");

        description += ` Bounty has been claimed by ${winners}.`;
    }

    const props: CreateClaimProps = {
        bounty,
        meta: {
            description,
            title: `Claim ${bounty.game.title} Bounty`,
            url: `https://turboboard.io/bounty/${bounty.id}`,
        },
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
