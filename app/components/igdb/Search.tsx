import { useState } from "react";

import Input from "@Components/inputs/Input";

type Item = {
    cover: string;
    id: number;
    released: number;
    title: string;
};

type State = {
    items: Item[];
    query: string;
};

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

const Component = ({ set_game }: { set_game: Function }) => {
    const [state, set_state] = useState<State>({
        items: [],
        query: "",
    });

    const [timer, set_timer] = useState<any>(null);

    const handle_change = (key: "query", query: string) => {
        set_state({
            items: [],
            [key]: query,
        });

        clearTimeout(timer);

        if (query.length < 3) {
            return;
        }

        const new_timer = setTimeout(async () => {
            set_state({
                items: [],
                query,
            });

            const items = await get_new_items(query);

            set_state({
                items,
                query,
            });

            set_timer(null);
        }, 500);

        set_timer(new_timer);
    };

    const handle_click = (item: Item) => {
        set_state({
            items: [],
            query: item.title,
        });

        set_game(item);
    };

    let class_name = "search";

    if (timer) class_name += " search--loading";

    const is_open = state.items.length > 0;

    return (
        <div>
            <div className={class_name}>
                <Input handle_change={handle_change} id="query" label="Search by Game Title" placeholder="Super Mario 64, Legend of Zelda, Mega Man X..." type="search" value={state.query} />

                {is_open && (
                    <ul className="search__list">
                        {state.items.map((item) => (
                            <li key={item.id} className="search-item">
                                <button className="search-item__button" onClick={() => handle_click(item)}>
                                    <img className="search-item__image" alt={`${item.title} cover`} src={item.cover} />

                                    <div>
                                        <div className="search-item__title">{item.title}</div>
                                        <div className="search-item__released">{item.released}</div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {is_open && <div className="search__cover" />}
        </div>
    );
};

export default Component;
