import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";

import { TurboardioUser, User } from "@Types";

import { blur } from "@Lib";

type State = {
    name: TurboardioUser["name"];
    pronouns: TurboardioUser["pronouns"];
    src_handle: TurboardioUser["src_handle"];
    twitch_handle: TurboardioUser["twitch_handle"];
    twitter_handle: TurboardioUser["twitter_handle"];
};

const validate_form = (user, state) => {
    const saved_state: State = {
        name: user.name,
        pronouns: user.pronouns || "",
        src_handle: user.src_handle || "",
        twitch_handle: user.twitch_handle || "",
        twitter_handle: user.twitter_handle || "",
    };

    return JSON.stringify(saved_state) === JSON.stringify(state);
};

const Form = ({ email, handle_update, is_loading, user }: { email: User["email"]; handle_update: Function; is_loading: boolean; user: TurboardioUser }) => {
    const [state, set_state] = useState<State>({
        name: user.name,
        pronouns: user.pronouns || "",
        src_handle: user.src_handle || "",
        twitch_handle: user.twitch_handle || "",
        twitter_handle: user.twitter_handle || "",
    });

    const is_disabled = validate_form(user, state);

    const handle_change = (key: string, value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        blur();

        if (is_disabled) return;

        await handle_update({
            name: state.name,
            pronouns: state.pronouns || null,
            src_handle: state.src_handle || null,
            twitch_handle: state.twitch_handle || null,
            twitter_handle: state.twitter_handle || null,
        });
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <Input disabled={true} id="email" label="Email Address" required={true} type="email" value={email} />

            <Input handle_change={handle_change} id="name" label="User Name" placeholder="Gamer" required={true} value={state.name} />

            <Input handle_change={handle_change} id="pronouns" label="Pronouns" max_length={64} placeholder="They/She/He" value={state.pronouns} />

            <Input handle_change={handle_change} id="src_handle" label="Speedrun.com Handle" value={state.src_handle} />

            <Input handle_change={handle_change} id="twitch_handle" label="Twitch.tv Handle" value={state.twitch_handle} />

            <Input handle_change={handle_change} id="twitter_handle" label="Twitter.com Handle" value={state.twitter_handle} />

            <Button is_disabled={is_disabled} is_loading={is_loading} text="Update Details" />
        </form>
    );
};

export default Form;
