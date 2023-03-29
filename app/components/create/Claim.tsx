import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/create/Claim";

import { Bounty } from "@Types";
import { CreateClaimState } from "@States";

const create_claim = async (body: string) => {
    const response = await fetch(`/api/create/claim`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id }: { bounty_id: Bounty["id"] }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_create = async ({ comment, link }: CreateClaimState) => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            bounty_id,
            comment: comment || null,
            link,
        });

        const { success } = await create_claim(body);

        if (success) {
            router.push(`/bounty/${bounty_id}`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <h2>Submit Claim</h2>

            <Form handle_create={handle_create} is_loading={is_loading} />
        </div>
    );
};

export default Component;
