import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Components/forms/ClaimSubmit";

import { Bounty } from "@Types";

const submit_claim = async ({ bounty_id, comment, link }) => {
    const response = await fetch(`/api/claim/submit`, {
        method: "POST",
        body: JSON.stringify({
            bounty_id,
            comment: comment.length ? comment : null,
            link,
        }),
    });

    return await response.json();
};

const Component = ({ bounty_id }: { bounty_id: Bounty["id"] }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_create = async ({ comment, link }: { comment: string; link: string }) => {
        set_is_loading(true);

        const { success } = await submit_claim({ bounty_id, comment, link });

        if (success) {
            router.reload();
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
