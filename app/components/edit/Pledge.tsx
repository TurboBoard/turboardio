import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/edit/Pledge";

import { Bounty, Pledge } from "@Types";

import { EditPledgeState } from "@States";

const edit_pledge = async (body: string) => {
    const response = await fetch(`/api/edit/pledge`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id, pledge_id, initial_state }: { bounty_id: Bounty["id"]; pledge_id: Pledge["id"]; initial_state: EditPledgeState }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_edit = async ({ amount }: EditPledgeState) => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            amount: parseInt(amount),
            bounty_id,
            pledge_id,
        });

        await edit_pledge(body);

        router.push(`/bounty/${bounty_id}`);
    };

    return <Form handle_edit={handle_edit} initial_state={initial_state} is_loading={is_loading} />;
};

export default Component;
