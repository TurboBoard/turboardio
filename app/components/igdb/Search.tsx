import { useState } from "react";

import Form from "@Forms/Search";
import Game from "@Components/igdb/Game";

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

const Component = () => {
    const [items, set_items] = useState([]);

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_search = async (state: { query: string }) => {
        set_is_loading(true);

        const new_items = await get_new_items(state.query);

        set_items(new_items);

        set_is_loading(false);
    };

    return (
        <div>
            <div className="mb-7">
                <Form handle_search={handle_search} is_loading={is_loading} />
            </div>

            {items.length > 0 && (
                <div className="divide-y">
                    {items.map((game) => (
                        <div key={game.id} className="py-7 border-silver">
                            <Game {...game} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Component;
