import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/delete/Claim";
import Claim from "@Components/Claim";

import { Bounty, Claim as ClaimType } from "@Types";

const delete_claim = async (body: string) => {
    const response = await fetch(`/api/delete/claim`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id, claim }: { bounty_id: Bounty["id"]; claim: ClaimType }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_delete = async () => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            claim_id: claim.id,
        });

        const { success } = await delete_claim(body);

        if (success) {
            router.push(`/bounty/${bounty_id}`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <h2>Delete Claim</h2>

            <div className="mb-8">
                <Claim {...claim} />
            </div>

            <Form handle_delete={handle_delete} is_loading={is_loading} />
        </div>
    );
};

export default Component;
