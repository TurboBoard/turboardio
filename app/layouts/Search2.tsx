import { useState } from "react";

import Button from "@Components/inputs/Button";
import Game from "@Components/Game";
import Input from "@Components/inputs/Input";

import { SearchProps } from "@Props";

const get_new_items = async (query: string) => {
    const response = await fetch("/api/game/search", {
        method: "post",
        body: JSON.stringify({
            query,
        }),
    });

    const json = await response.json();

    if (json) {
        return json;
    }
};

// const body = `fields id, cover, first_release_date, involved_companies.company.name, name, platforms.name; search "${query}"; where version_parent = null & category != 11; limit 10;`;

// const response = await fetch("https://api.igdb.com/v4/games/", {
//     method: "post",
//     headers: {
//         Accept: "application/json",
//         "Client-ID": twitch_client_id,
//         Authorization: `Bearer ${twitch_access_token}`,
//     },
//     body,
// });

// const json: any = await response.json();

const Layout = ({}: SearchProps) => {
    const [items, set_items] = useState([]);

    const [query, set_query] = useState<string>("");

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_change = (key: "query", value: string) => set_query(value);

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        set_is_loading(true);

        const new_items = await get_new_items(query);

        set_items(new_items);

        set_is_loading(false);
    };

    return (
        <section>
            <h1>Game Search</h1>

            <div className="mb-7">
                <form className="space-y-8" onSubmit={handle_submit}>
                    <div className="space-y-6">
                        <Input handle_change={handle_change} id="query" label="Search by Game Title" placeholder="Super Mario 64, Legend of Zelda, Mega Man X..." type="search" value={query} />

                        {/* prettier-ignore */}
                        <div><small>Powered by <a className="generic-link" href="https://www.igdb.com/" target="_blank">IGDB</a></small></div>
                    </div>

                    <Button is_disabled={query.length === 0} is_loading={is_loading} text="Search" />
                </form>
            </div>

            {items.length > 0 && (
                <div className="divide-y">
                    {items.map((game) => (
                        <div key={game.id} className="py-7">
                            <Game game={game} href={`/game/${game.id}`} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Layout;
