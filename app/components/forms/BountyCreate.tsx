import { useState } from "react";

import Button from "@Components/inputs/Button";
import TextArea from "@Components/inputs/TextArea";

type State = {
    details: string;
};

const Form = ({ handle_create, is_disabled, is_loading }: { handle_create: Function; is_disabled: boolean; is_loading: boolean }) => {
    const [state, set_state] = useState<State>({
        details: "",
    });

    const handle_change = (key: "details", value: string) =>
        set_state({
            [key]: value,
        });

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_create(state);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <TextArea id="details" label="Bounty Details" handle_change={handle_change} max_length={1024} value={state.details} />

            <Button is_disabled={is_disabled || !state.details.length} is_loading={is_loading} text="Create Bounty" />
        </form>
    );
};

export default Form;
