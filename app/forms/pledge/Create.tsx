import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";

type State = {
    amount: number;
};

const Form = ({ handle_create, is_loading }: { handle_create: Function; is_loading: boolean }) => {
    const [state, set_state] = useState<State>({
        amount: 0,
    });

    const handle_change = (key: "amount", value: string) =>
        set_state({
            ...state,
            [key]: parseInt(value),
        });

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_create(state);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <Input handle_change={handle_change} id="amount" label="Pledge Amount" placeholder="20" required={true} type="number" value={state.amount} />

            <Button is_disabled={state.amount === 0} is_loading={is_loading} text="Submit Pledge" />
        </form>
    );
};

export default Form;
