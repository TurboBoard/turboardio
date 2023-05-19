import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";

import { validate } from "@Lib";

import { EditPledgeState } from "@States";

const Form = ({ handle_edit, initial_state, is_loading }: { handle_edit: Function; initial_state: EditPledgeState; is_loading: boolean }) => {
    const [state, set_state] = useState<EditPledgeState>(initial_state);

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
            <Input handle_change={handle_change} id="amount" label="Pledge Amount in USD" min={1} placeholder="5" required={true} type="number" value={state.amount} />

            <Button is_disabled={!state.amount || !is_valid} is_loading={is_loading} text="Edit Pledge" />
        </form>
    );
};

export default Form;
