import { useState } from "react";

import { useRouter } from "next/router";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";

import { User } from "@Types";

import { validate } from "@Lib";

type State = {
    name: string;
    pronouns: string;
    src_handle: string;
    twitch_handle: string;
    twitter_handle: string;
};

const Form = ({ edit_details, email, initial_state }: { edit_details: Function; email: User["email"]; initial_state: State }) => {
    const router = useRouter();

    const [state, set_state] = useState<State>(initial_state);

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_change = (key: string, value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        blur();

        set_is_loading(true);

        await edit_details({
            name: state.name,
            pronouns: state.pronouns.length ? state.pronouns : null,
            src_handle: state.src_handle.length ? state.src_handle : null,
            twitch_handle: state.twitch_handle.length ? state.twitch_handle : null,
            twitter_handle: state.twitter_handle.length ? state.twitter_handle : null,
        });

        router.push("/account");
    };

    const is_valid = validate(initial_state, state);

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <Input disabled={true} id="email" label="Email Address" required={true} type="email" value={email} />

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
