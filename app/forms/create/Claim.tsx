import { useState } from "react";

import { useRouter } from "next/router";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { Bounty } from "@Types";

type State = {
    comment: string;
    link: string;
};

const submit_claim = async (body: string) => {
    const response = await fetch(`/ claim/create`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Form = ({ bounty_id }: { bounty_id: Bounty["id"] }) => {
    const router = useRouter();

    const [state, set_state] = useState<State>({
        comment: "",
        link: "",
    });

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_change = (key: "comment" | "link", value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        set_is_loading(true);

        const body: string = JSON.stringify({ bounty_id, comment: state.comment.length ? state.comment : null, link: state.link });

        const { success } = await submit_claim(body);

        if (success) {
            router.reload();

            return;
        }

        set_is_loading(false);
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
