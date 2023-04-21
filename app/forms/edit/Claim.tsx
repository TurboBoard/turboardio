import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { validate } from "@Lib";

import { EditClaimState } from "@States";

const Form = ({ handle_edit, initial_state, is_loading }: { handle_edit: Function; initial_state: EditClaimState; is_loading: boolean }) => {
    const [state, set_state] = useState<EditClaimState>(initial_state);

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
            <TextArea id="comment" label="Comment" handle_change={handle_change} max_length={1024} required={true} value={state.comment} />

            <Input handle_change={handle_change} id="link" label="Video Link" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" required={true} type="url" value={state.link} />

            <Button is_disabled={!state.comment.length || !is_valid} is_loading={is_loading} text="Edit Claim" />
        </form>
    );
};

export default Form;
