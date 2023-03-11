import { useState } from "react";

import { useRouter } from "next/router";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { validate } from "@Lib";

type State = {
    details: string;
    end_date: string;
    start_date: string;
};

const edit_bounty = async (body: string) => {
    const response = await fetch(`/api/edit/bounty`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Form = ({ initial_state }: { initial_state: State }) => {
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

        const bounty_id = router.query.bounty_id;

        const body = JSON.stringify({
            bounty_id,
            details: state.details,
            end_date: state.end_date.length ? state.end_date : null,
            start_date: state.start_date.length ? state.start_date : null,
        });

        await edit_bounty(body);

        // router.push(`/bounty/${bounty_id}`);
    };

    const is_valid = validate(initial_state, state);

    return (
        <form className="space-y-8" onSubmit={null}>
            <TextArea id="details" label="Bounty Details" handle_change={handle_change} max_length={1024} required={true} value={state.details} />

            <div className="grid grid-cols-2 space-x-8">
                <Input handle_change={handle_change} id="start_date" label="Start Date" required={false} type="date" value={state.start_date} />

                <Input handle_change={handle_change} id="end_date" label="End Date" required={false} type="date" value={state.end_date} />
            </div>

            <Button is_disabled={!state.details.length || !is_valid} is_loading={is_loading} text="Edit Bounty" />
        </form>
    );
};

export default Form;
