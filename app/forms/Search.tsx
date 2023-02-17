import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";

type State = {
    query: string;
};

const Form = ({ handle_search, is_loading }: { handle_search: Function; is_loading: boolean }) => {
    const [state, set_state] = useState<State>({
        query: "",
    });

    const handle_change = (key: "query", value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_search(state);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <div className="space-y-6">
                <Input handle_change={handle_change} id="query" label="Search by Game Title" placeholder="Super Mario 64, Legend of Zelda, Mega Man X..." type="search" value={state.query} />

                {/* prettier-ignore */}
                <div><small>Powered by <a className="highlight-link" href="https://www.igdb.com/" target="_blank">IGDB</a></small></div>
            </div>

            <Button is_disabled={state.query.length === 0} is_loading={is_loading} text="Search" />
        </form>
    );
};

export default Form;
