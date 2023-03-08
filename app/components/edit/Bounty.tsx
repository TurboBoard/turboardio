import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/bounty/Edit";

import { Bounty } from "@Types";

// TODO: This should go in edit layout since it's just editing hte layout

const edit_bounty = async (body: string) => {
    const response = await fetch("/api/bounty/edit", {
        method: "post",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id, initial_state }: { bounty_id: Bounty["id"]; initial_state: any }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_edit = async ({ details, discord_link, end_date, start_date }: { details: string; discord_link: string; end_date: string; start_date: string }) => {
        set_is_loading(true);

        const { success } = await edit_bounty(
            JSON.stringify({
                bounty_id,
                details,
                discord_link,
                end_date,
                start_date,
            })
        );

        if (success) {
            router.push(`/bounty/${bounty_id}`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <h2>Edit Bounty</h2>

            <Form handle_edit={handle_edit} initial_state={initial_state} is_loading={is_loading} />
        </div>
    );
};

export default Component;
