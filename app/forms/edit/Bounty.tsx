import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { validate } from "@Lib";

import { EditBountyState } from "@States";

const Form = ({ handle_edit, initial_state, is_loading }: { handle_edit: Function; initial_state: EditBountyState; is_loading: boolean }) => {
    const [state, set_state] = useState<EditBountyState>(initial_state);

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
            <TextArea id="details" label="Bounty Details" handle_change={handle_change} max_length={2048} required={true} value={state.details} />

            <div className="grid grid-cols-2 space-x-8">
                <Input handle_change={handle_change} id="start_date" label="Start Date" required={false} type="date" value={state.start_date} />

                <Input handle_change={handle_change} id="end_date" label="End Date" required={false} type="date" value={state.end_date} />
            </div>

            <Button is_disabled={!state.details.length || !is_valid} is_loading={is_loading} text="Edit Bounty" />
        </form>
    );
};

export default Form;
