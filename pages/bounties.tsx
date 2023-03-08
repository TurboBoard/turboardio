import aws from "@Apis/aws";

import { GameHelper } from "@Helpers";

import Layout from "@Layouts/Bounties";

import { Bounty, Pledge, TurboardioUser } from "@Types";
import { BountiesProps } from "@Props";

import { convert, format } from "@Lib";

const Page = (props: BountiesProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const get_claims = async () => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_claims",
    });

    return Items.reduce(
        (acc, Item) => {
            const { amount, bounty_id } = aws.dynamo.unmarshall(Item);

            if (amount) return acc;

            if (acc[bounty_id]) return acc;

            acc[bounty_id] = true;

            return acc;
        },
        {} as {
            [bounty_id: Bounty["id"]]: Bounty["is_claimed"];
        }
    );
};

const get_pledges = async () => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
    });

    return Items.reduce(
        (acc, Item) => {
            const { amount, bounty_id, pledge_id, user_id } = aws.dynamo.unmarshall(Item);

            if (!acc[bounty_id]) {
                acc[bounty_id] = [];
            }

            acc[bounty_id].push({
                amount,
                id: pledge_id,
                user_id,
            });

            return acc;
        },
        {} as {
            [bounty_id: Bounty["id"]]: Pledge[];
        }
    );
};

const get_turboardio_users = async () => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_users",
    });

    return Items.reduce(
        (acc, Item) => {
            const turboardio_user = convert.turboardio_user(aws.dynamo.unmarshall(Item));

            acc[turboardio_user.id] = turboardio_user;

            return acc;
        },
        {} as {
            [user_id: TurboardioUser["id"]]: TurboardioUser;
        }
    );
};

export async function getStaticProps() {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
    });

    const claims = await get_claims();

    console.log(claims);

    const pledges = await get_pledges();

    const turboardio_users = await get_turboardio_users();

    let bounties: BountiesProps["bounties"] = [];

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item))
        .sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        .slice(0, 5);

    for (const { admin_id, bounty_id, created_at, game_id } of sorted) {
        const game = await GameHelper.get_game(game_id);

        const turboardio_user = turboardio_users[admin_id];

        // console.log("is claimed", claims[bounty_id] || false);
        console.log(bounty_id);

        bounties.push({
            admin: {
                id: turboardio_user.id,
                name: turboardio_user.name,
            },
            amount: pledges[bounty_id] ? pledges[bounty_id].reduce((acc, { amount }) => (acc += amount), 0) : null,
            created_at: format.iso(created_at),
            game,
            id: bounty_id,
            is_claimed: false,
            // is_claimed: await ClaimHelper.get_is_claimed(bounty_id),
            pledges: pledges[bounty_id],
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
