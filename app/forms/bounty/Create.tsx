import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

type State = {
    details: string;
    discord_link: string;
};

const Form = ({ handle_create, is_loading }: { handle_create: Function; is_loading: boolean }) => {
    const [state, set_state] = useState<State>({
        details: "",
        discord_link: "",
    });

    const handle_change = (key: "details" | "discord", value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_create(state);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <TextArea id="details" label="Bounty Details" handle_change={handle_change} max_length={1024} required={true} value={state.details} />

            <Input handle_change={handle_change} id="discord_link" label="Optional Discord Server" placeholder="https://discord.gg/7cZvW3AZ7M" required={false} type="url" value={state.discord_link} />

            <Button is_disabled={!state.details.length} is_loading={is_loading} text="Create Bounty" />
        </form>
    );
};

export default Form;
