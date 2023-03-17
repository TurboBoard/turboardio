import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";

import { validate } from "@Lib";

import { EditDetailsState } from "@States";

const Form = ({ handle_edit, initial_state, is_loading }: { handle_edit: Function; initial_state: EditDetailsState; is_loading: boolean }) => {
    const [state, set_state] = useState<EditDetailsState>(initial_state);

    const handle_change = (key: string, value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_edit(state);
    };

    const is_valid = validate(initial_state, state);

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <Input handle_change={handle_change} id="name" label="User Name" placeholder="Gamer" required={true} value={state.name} />

            <Input handle_change={handle_change} id="pronouns" label="Pronouns" max_length={64} placeholder="They/She/He" value={state.pronouns} />

            <Input handle_change={handle_change} id="src_handle" label="Speedrun.com Handle" value={state.src_handle} />

            <Input handle_change={handle_change} id="twitch_handle" label="Twitch.tv Handle" value={state.twitch_handle} />

            <Input handle_change={handle_change} id="twitter_handle" label="Twitter.com Handle" value={state.twitter_handle} />

            <Button is_disabled={!is_valid} is_loading={is_loading} text="Update Details" />
        </form>
    );
};

export default Form;
