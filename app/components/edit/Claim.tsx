import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/edit/Claim";

import { Bounty, Claim } from "@Types";

import { EditClaimState } from "@States";

const edit_claim = async (body: string) => {
    const response = await fetch(`/api/edit/claim`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id, claim_id, initial_state }: { bounty_id: Bounty["id"]; claim_id: Claim["id"]; initial_state: EditClaimState }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_edit = async ({ comment, link }: EditClaimState) => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            claim_id,
            comment: comment || null,
            link,
        });

        await edit_claim(body);

        router.push(`/bounty/${bounty_id}`);
    };

    return <Form handle_edit={handle_edit} initial_state={initial_state} is_loading={is_loading} />;
};

export default Component;
