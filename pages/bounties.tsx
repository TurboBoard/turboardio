import aws from "@Apis/aws";

import { ClaimHelper, GameHelper, PledgeHelper, TurboardioUserHelper } from "@Helpers";

import Layout from "@Layouts/Bounties";

import { BountiesProps } from "@Props";

import { format } from "@Lib";

const Page = (props: BountiesProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

export async function getStaticProps() {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item))
        .sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        .slice(0, 5);

    const bounties: BountiesProps["bounties"] = [];

    for (const { admin_id, bounty_id, created_at, game_id } of sorted) {
        const admin = await TurboardioUserHelper.get_turboardio_user(admin_id);

        const game = await GameHelper.get_game(game_id);

        const is_claimed = await ClaimHelper.get_is_claimed(bounty_id);

        const pledges = await PledgeHelper.get_pledges(bounty_id);

        bounties.push({
            admin: {
                id: admin.id,
                name: admin.name,
            },
            amount: pledges ? pledges.reduce((acc, { amount }) => (acc += amount), 0) : null,
            created_at: format.iso(created_at),
            game,
            id: bounty_id,
            is_claimed,
            pledges,
        });
    }

    const props: BountiesProps = {
        bounties,
        meta: {
            description: "View the latest bounties or search for your favourite game.",
            title: "Latest bounties",
            url: `https://turboboard.io/bounties`,
        },
    };

    return {
        props,
        revalidate: 60,
    };
}

export default Page;
