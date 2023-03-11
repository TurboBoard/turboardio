import { useState } from "react";

import { useRouter } from "next/router";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";

import { Bounty } from "@Types";

const submit_pledge = async (body: string) => {
    const response = await fetch(`/api/pledge/create`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Form = ({ bounty_id }: { bounty_id: Bounty["id"] }) => {
    const router = useRouter();

    const [amount, set_amount] = useState<number>(0);

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_change = (key: "amount", value: string) => set_amount(parseInt(value));

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        set_is_loading(true);

        const body: string = JSON.stringify({ amount, bounty_id });

        const { success } = await submit_pledge(body);

        if (success) {
            router.reload();

            return;
        }

        set_is_loading(false);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <Input handle_change={handle_change} id="amount" label="Pledge Amount" placeholder="20" required={true} type="number" value={amount} />

            <Button is_disabled={amount === 0} is_loading={is_loading} text="Submit Pledge" />
        </form>
    );
};

export default Form;
