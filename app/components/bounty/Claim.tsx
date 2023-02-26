import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/claim/Create";

import { Bounty } from "@Types";

const submit_claim = async (body: string) => {
    const response = await fetch(`/api/claim/create`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ bounty_id }: { bounty_id: Bounty["id"] }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_create = async (state: { comment: string; link: string }) => {
        set_is_loading(true);

        const { success } = await submit_claim(JSON.stringify({ bounty_id, comment: state.comment.length ? state.comment : null, link: state.link }));

        if (success) {
            router.reload();

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
