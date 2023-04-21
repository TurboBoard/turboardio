import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/delete/Pledge";
import Pledge from "@Components/Pledge";

import { Bounty, Pledge as PledgeType } from "@Types";

const delete_pledge = async (body: string) => {
    const response = await fetch(`/api/delete/pledge`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id, pledge }: { bounty_id: Bounty["id"]; pledge: PledgeType }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_delete = async () => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            pledge_id: pledge.id,
        });

        const { success } = await delete_pledge(body);

        if (success) {
            router.push(`/bounty/${bounty_id}`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <h2>Delete Pledge</h2>

            <div className="mb-8">
                <Pledge {...pledge} />
            </div>

            <Form handle_delete={handle_delete} is_loading={is_loading} />
        </div>
    );
};

export default Component;
