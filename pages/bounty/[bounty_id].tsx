import aws from "@Apis/aws";

import Layout from "@Layouts/Bounty";

import { Bounty, Claim, Game, TurboardioUser } from "@Types";
import { BountyProps } from "@Props";

import { convert, format } from "@Lib";

const Page = (props: BountyProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_claims = async (bounty_id: Bounty["id"]): Promise<Bounty["claims"]> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_claims",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Items.length) return null;

    const claims = [];

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const { comment, created_at, claim_id, link, user_id } of sorted) {
        const user = await get_user(user_id);

        claims.push({
            comment: comment || null,
            created_at: format.created_at(created_at),
            id: claim_id,
            link,
            user,
        });
    }

    return claims;
};

const get_game = async (game_id: Game["id"]): Promise<Game> => {
    const response = await fetch(process.env.IGDB_GAME_ENDPOINT, {
        method: "post",
        headers: {
            Accept: "application/json",
            "X-Turbo-Key": process.env.CLOUDFLARE_API_TOKEN,
        },
        body: JSON.stringify({
            game_id: game_id.toString(),
        }),
    });

    return await response.json();
};

const get_pledges = async (bounty_id: Bounty["id"]): Promise<Bounty["pledges"]> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Items.length) return null;

    const pledges = [];

    for (const Item of Items) {
        const { amount, pledge_id, user_id } = aws.dynamo.unmarshall(Item);

        pledges.push({
            amount,
            id: pledge_id,
            user_id,
        });
    }

    return pledges;
};

const get_user = async (admin_id: TurboardioUser["id"]): Promise<TurboardioUser> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(admin_id),
        },
    });

    return convert.turboardio_user(aws.dynamo.unmarshall(Item));
};

const get_winning_claim = (claims: Bounty["claims"], winning_claim_id: Claim["id"]): Bounty["winning_claim"] => {
    if (!winning_claim_id) return null;

    const winning_claim = claims.find(({ id }) => id === winning_claim_id);

    const youtube_id = convert.link_to_youtube_id(winning_claim.link);

    if (youtube_id) {
        return {
            ...winning_claim,
            video: {
                id: youtube_id,
                type: "youtube",
            },
        };
    }

    const twitch_id = convert.link_to_twitch_id(winning_claim.link);

    if (twitch_id) {
        return {
            ...winning_claim,
            video: {
                id: twitch_id,
                type: "twitch",
            },
        };
    }

    return winning_claim;
};

export async function getStaticProps({ params: { bounty_id } }: { params: { bounty_id: Bounty["id"] } }) {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_bounties",
        Key: {
            bounty_id: aws.dynamo.input(bounty_id),
        },
    });

    const { admin_id, claim_id, created_at, details, game_id } = aws.dynamo.unmarshall(Item);

    const admin = await get_user(admin_id);

    const game = await get_game(game_id);

    const pledges = await get_pledges(bounty_id);

    const prize = pledges ? pledges.reduce((acc, { amount }) => acc + amount, 0) : null;

    const claims = await get_claims(bounty_id);

    const winning_claim = get_winning_claim(claims, claim_id);

    let meta_description = `${game.title} bounty.`;

    if (prize) {
        meta_description = ` Prize: ${prize}`;
    }

    if (winning_claim) {
        meta_description += ` Bounty has been claimed by ${winning_claim.user.name}.`;
    }

    const props: BountyProps = {
        bounty: {
            admin,
            claims,
            created_at: format.created_at(created_at),
            details,
            game,
            id: bounty_id,
            pledges,
            prize,
            winning_claim,
        },
        meta: {
            description: meta_description,
            title: `${game.title} Bounty`,
            url: `https://turboboard.io/bounty/${bounty_id}`,
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

export default Page;
