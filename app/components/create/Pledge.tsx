import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/create/Pledge";

import { Bounty } from "@Types";
import { CreatePledgeState } from "@States";

const create_pledge = async (body: string) => {
    const response = await fetch(`/api/create/pledge`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id }: { bounty_id: Bounty["id"] }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_create = async ({ amount }: CreatePledgeState) => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            amount: parseInt(amount, 10),
            bounty_id,
        });

        const { success } = await create_pledge(body);

        if (success) {
            router.push(`/bounty/${bounty_id}`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <h2>Create Pledge</h2>

            <Form handle_create={handle_create} is_loading={is_loading} />
        </div>
    );
};

export default Component;
