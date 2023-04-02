import { ChangeEvent, useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";

import { CreatePledgeState } from "@States";

const Form = ({ handle_create, is_loading }) => {
    const [state, set_state] = useState<CreatePledgeState>({
        amount: "",
        checked: false,
    });

    const handle_change = (key: "amount" | "checked", value: boolean | string) =>
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
            <Input handle_change={handle_change} id="amount" label="Pledge Amount in USD" min={1} placeholder="5" required={true} type="number" value={state.amount} />

            <div className="flex flex-row-reverse justify-start items-center gap-x-7">
                {/* prettier-ignore */}
                <label className="flex-1 text-sm" htmlFor="confirm">
                    TurboBoard operates on an honour system. When you create a pledge you are making a promise to pay the winner the amount you specified. Please click on the checkbox to confirm.
                </label>

                <div>
                    <input
                        className="h-7 accent-pink"
                        id="confirm"
                        checked={state.checked}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handle_change("checked", e.target.checked)}
                        type="checkbox"
                        required={true}
                    />
                </div>
            </div>

            <Button is_disabled={!state.amount || !state.checked} is_loading={is_loading} text="Create Pledge" />
        </form>
    );
};

export default Form;
