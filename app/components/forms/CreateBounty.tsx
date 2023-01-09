import { useState } from "react";

import GameSearch from "@Components/igdb/GameSearch";

type State = {
    details: string;
    game_id: number | null;
};

const Form = () => {
    const [state, set_state] = useState<State>({
        details: "",
        game_id: null,
    });

    const handle_change = (e: React.FormEvent<HTMLTextAreaElement>) =>
        set_state({
            ...state,
            details: e.currentTarget.value,
        });

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("handle submit of form");
    };

    const set_game_id = (new_game_id: State["game_id"]) =>
        set_state({
            ...state,
            game_id: new_game_id,
        });

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <GameSearch set_game_id={set_game_id} />

            <div>
                <label>Bounty Details</label>

                <textarea onChange={handle_change} maxLength={1024} value={state.details} />
            </div>

            <button className="button">Create Bounty</button>
        </form>
    );
};

export default Form;
