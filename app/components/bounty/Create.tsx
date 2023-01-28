import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Components/forms/BountyCreate";
import Select from "@Components/igdb/Select";

import { Game } from "@Types";

const create_bounty = async (details: string, game_id: Game["id"]) => {
    const response = await fetch(`/api/bounty/create`, {
        method: "POST",
        body: JSON.stringify({
            details,
            game_id,
        }),
    });

    return await response.json();
};

const Component = () => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const [game, set_game] = useState<Game | null>(null);

    const handle_create = async ({ details }: { details: string }) => {
        set_is_loading(true);

        const { bounty_id } = await create_bounty(details, game.id);

        if (bounty_id) {
            router.push(`/bounty/${bounty_id}`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div className="space-y-8">
            <Select game={game} set_game={set_game} />

            <Form handle_create={handle_create} is_disabled={game ? false : true} is_loading={is_loading} />
        </div>
    );
};

export default Component;
