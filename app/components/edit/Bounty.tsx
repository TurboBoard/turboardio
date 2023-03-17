import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/edit/Bounty";

import { EditBountyState } from "@States";

const edit_bounty = async (body: string) => {
    const response = await fetch(`/api/edit/bounty`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ initial_state }: { initial_state: EditBountyState }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_edit = async ({ details, end_date, start_date }: EditBountyState) => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            bounty_id: router.query.bounty_id,
            details,
            end_date: end_date || null,
            start_date: start_date || null,
        });

        await edit_bounty(body);

        router.push(`/bounty/${router.query.bounty_id}`);
    };

    return <Form handle_edit={handle_edit} initial_state={initial_state} is_loading={is_loading} />;
};

export default Component;
