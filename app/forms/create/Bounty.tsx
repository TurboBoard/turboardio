import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { CreateBountyState } from "@States";

const Form = ({ handle_create, is_loading }) => {
    const [state, set_state] = useState<CreateBountyState>({
        amount: "",
        details: "",
        end_date: "",
        start_date: "",
    });

    const handle_change = (key: string, value: string) =>
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
            <TextArea id="details" label="Bounty Details" handle_change={handle_change} max_length={1024} required={true} value={state.details} />

            <Input handle_change={handle_change} id="amount" label="Pledge Amount in USD" min={0} placeholder="5" required={false} type="number" value={state.amount} />

            <div className="grid grid-cols-2 space-x-8">
                <Input handle_change={handle_change} id="start_date" label="Start Date" required={false} type="date" value={state.start_date} />

                <Input handle_change={handle_change} id="end_date" label="End Date" required={false} type="date" value={state.end_date} />
            </div>

            <Button is_disabled={!state.details.length} is_loading={is_loading} text="Create Bounty" />
        </form>
    );
};

export default Form;
