import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/create/Bounty";

import { CreateBountyState } from "@States";

const create_bounty = async (body: string) => {
    const response = await fetch(`/api/create/bounty`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = () => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_create = async ({ amount, details, end_date, start_date }: CreateBountyState) => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            amount: amount ? parseInt(amount, 10) : null,
            details,
            end_date: end_date || null,
            game_id: parseInt(router.query.game_id as string),
            start_date: start_date || null,
        });

        const { bounty_id } = await create_bounty(body);

        if (bounty_id) {
            router.push(`/bounty/${bounty_id}`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <Form handle_create={handle_create} is_loading={is_loading} />
        </div>
    );
};

export default Component;
