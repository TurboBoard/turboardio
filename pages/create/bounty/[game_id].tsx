import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/create/Bounty";

import { Game } from "@Types";
import { CreateBountyProps } from "@Props";

const Page = (props: CreateBountyProps) => {
    if (!props.game) return null;

    return <Layout {...props} />;
};

const get_game = async (game_id: Game["id"]): Promise<CreateBountyProps["game"]> => {
    const response = await fetch(process.env.IGDB_GAME_ENDPOINT, {
        method: "post",
        headers: {
            Accept: "application/json",
            "X-Turbo-Key": process.env.CLOUDFLARE_API_TOKEN,
        },
        body: JSON.stringify({
            game_id,
        }),
    });

    return await response.json();
};

export async function getStaticProps({ params }: { params: { game_id: string } }) {
    const game_id = parseInt(params.game_id);

    const game = await get_game(game_id);

    const props: CreateBountyProps = {
        game,
        meta: {
            description: "Search through 200,000+ video games for your favourite game and add a bounty to the bounty board.",
            title: "Create a Bounty",
            url: "https://turboboard.io/create/bounty",
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
