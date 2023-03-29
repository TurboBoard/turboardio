import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { CreateClaimState } from "@States";

const Form = ({ handle_create, is_loading }) => {
    const [state, set_state] = useState<CreateClaimState>({
        comment: "",
        link: "",
    });

    const handle_change = (key: "comment" | "link", value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_create(state);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <TextArea id="comment" label="Comment" handle_change={handle_change} max_length={1024} value={state.comment} />

            <Input handle_change={handle_change} id="link" label="Video Link" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" required={true} type="url" value={state.link} />

            <Button is_disabled={!state.link.length} is_loading={is_loading} text="Submit Claim" />
        </form>
    );
};

export default Form;
