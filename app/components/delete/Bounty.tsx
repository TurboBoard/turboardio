import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/delete/Bounty";

import { Bounty } from "@Types";

const delete_pledge = async (body: string) => {
    const response = await fetch(`/api/delete/bounty`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id }: { bounty_id: Bounty["id"] }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_delete = async () => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            bounty_id,
        });

        const { success } = await delete_pledge(body);

        if (success) {
            router.push(`/`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <h2>Delete Bounty</h2>

            <Form handle_delete={handle_delete} is_loading={is_loading} />
        </div>
    );
};

export default Component;
