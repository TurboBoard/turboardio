import { useState } from "react";

import Button from "@Components/inputs/Button";
import Claim from "@Components/Claim";
import Input from "@Components/inputs/Input";

import { validate } from "@Lib";

import { EditWinnersState } from "@States";

import { Bounty } from "@Types";

const Form = ({
    amount,
    claims,
    handle_edit,
    initial_state,
    is_loading,
}: {
    amount: Bounty["amount"];
    claims: Bounty["claims"];
    handle_edit: Function;
    initial_state: EditWinnersState;
    is_loading: boolean;
}) => {
    const [state, set_state] = useState<EditWinnersState>(initial_state);

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

    const total: number = Object.values(state).reduce((acc, curr) => {
        if (!curr) return acc;

        acc += parseInt(curr);

        return acc;
    }, 0);

    const valid_amount = total === amount || total === 0;

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <div className="divide-y divide-silver">
                {claims.map((claim) => {
                    return (
                        <div className="py-8" key={claim.id}>
                            <Claim {...claim} />

                            <div>
                                <Input handle_change={handle_change} id={claim.id} label="Amount in USD" min={0} type="number" value={state[claim.id]} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="text-center">
                <strong>NOTE:</strong>The total amount distributed must be equal to the amount pledged or 0 if you'd like to reset the bounty.
            </p>

            <Button is_disabled={!is_valid || !valid_amount} is_loading={is_loading} text="Edit Winners" />
        </form>
    );
};

export default Form;
