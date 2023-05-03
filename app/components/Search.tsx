import { useState } from "react";

import Game from "@Components/Game";

import Form from "@Forms/Search";

import { Game as GameType } from "@Types";

const get_results = async (body: string) => {
    const response = await fetch("/api/game/search", {
        method: "post",
        body,
    });

    return await response.json();
};

const Component = () => {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const [results, set_results] = useState<GameType[] | null>(null);

    const handle_search = async ({ platform, query, year }) => {
        set_is_loading(true);

        const body = {
            query,
        } as {
            platform?: number;
            query: string;
            year?: number;
        };

        if (platform) {
            body.platform = parseInt(platform, 10);
        }

        if (year) {
            body.year = parseInt(year, 10);
        }

        const new_results = await get_results(JSON.stringify(body));

        console.log(new_results);

        if (new_results) {
            set_results(new_results);
        }

        set_is_loading(false);
    };

    return (
        <div className="space-y-7">
            <Form handle_search={handle_search} is_loading={is_loading} />

            {results !== null && (
                <div className="divide-y">
                    {results.length >= 1 ? (
                        results.map((game) => (
                            <div key={game.id} className="py-7">
                                <Game game={game} href={`/game/${game.id}`} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Unfortunately there were no games that matched your search criteria.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Component;
