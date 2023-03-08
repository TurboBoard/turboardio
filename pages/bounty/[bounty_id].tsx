import aws from "@Apis/aws";

import { BountyHelper, ClaimHelper, GameHelper, PledgeHelper, TurboardioUserHelper } from "@Helpers";

import Layout from "@Layouts/Bounty";

import { Bounty } from "@Types";
import { BountyProps } from "@Props";

import { format } from "@Lib";

const Page = (props: BountyProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_winners = async (bounty_id: Bounty["id"], claims: Bounty["claims"]): Promise<Bounty["winners"]> => {
    const { Count, Items } = await aws.dynamo.scan({
        TableName: "turboardio_winners",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Count) return null;

    const winners: Bounty["winners"] = [];

    for (const Item of Items) {
        const { amount, claim_id } = aws.dynamo.unmarshall(Item);

        const claim = claims.find(({ id }) => id === claim_id);

        winners.push({
            amount,
            user: claim.user,
        });
    }

    return winners;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: Bounty["id"] } }) {
    const { admin_id, created_at, details, discord_link, end_date, game_id, start_date } = await BountyHelper.get_bounty(bounty_id);

    const admin = await TurboardioUserHelper.get_turboardio_user(admin_id);

    const claims = await ClaimHelper.get_claims(bounty_id);

    const game = await GameHelper.get_game(game_id);

    const pledges = await PledgeHelper.get_pledges(bounty_id);

    const winners = await get_winners(bounty_id, claims);

    const bounty: Bounty = {
        admin,
        amount: pledges ? pledges.reduce((acc, { amount }) => acc + amount, 0) : null,
        claims,
        created_at: format.iso(created_at),
        details,
        discord_link: discord_link || null,
        end_date: end_date || null,
        game,
        id: bounty_id,
        is_claimed: winners?.length > 0,
        pledges,
        start_date: start_date || null,
        winners,
    };

    let meta_description = `${bounty.game.title} bounty.`;

    if (bounty.amount) {
        meta_description = ` Prize: $${bounty.amount}`;
    }

    if (bounty.winners) {
        meta_description += ` Bounty has been claimed by ${bounty.winners.map(({ user }) => user.name).join(", ")}.`;
    }

    const props: BountyProps = {
        bounty,
        meta: {
            description: meta_description,
            title: `${bounty.game.title} Bounty`,
            url: `https://turboboard.io/bounty/${bounty.id}`,
        },
    };

    return {
        props,
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    const paths = Items.map((Item) => {
        const { bounty_id } = aws.dynamo.unmarshall(Item);

        return {
            params: {
                bounty_id,
            },
        };
    });

    return {
        paths,
        fallback: true,
    };
}

export default Page;
