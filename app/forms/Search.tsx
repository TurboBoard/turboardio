import { FormEvent, useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import Select from "@Components/inputs/Select";

import platforms from "@Data/platforms.json";

const Form = ({ handle_search, is_loading }: { handle_search: Function; is_loading: boolean }) => {
    const [state, set_state] = useState({
        query: "",
        platform: "",
        year: "",
    });

    const handle_change = (key: string, value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = (e: FormEvent) => {
        e.preventDefault();

        handle_search(state);
    };

    return (
        <form onSubmit={handle_submit}>
            <div>
                <div className="mb-8">
                    <Input handle_change={handle_change} id="query" label="Search by Game Title" placeholder="Super Mario 64, Legend of Zelda, Mega Man X..." type="search" value={state.query} />
                </div>

                <div className="md:flex md:space-x-8 mb-8">
                    <div className="md:w-1/2 mb-8 md:m-0">
                        <Select handle_change={(value: string) => handle_change("platform", value)} label="Platform" options={platforms} value={state.platform} />
                    </div>

                    <div className="md:w-1/2">
                        <Input handle_change={handle_change} id="year" label="Release Year" max_length={2024} min={1960} type="number" value={state.year} />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <Button is_disabled={state.query.length === 0} is_loading={is_loading} text="Search" />
            </div>

            {/* prettier-ignore */}
            <div><small>Powered by <a className="generic-link" href="https://www.igdb.com/" target="_blank">IGDB</a></small></div>
        </form>
    );
};

export default Form;
