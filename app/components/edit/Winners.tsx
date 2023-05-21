import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/edit/Winners";

import { Bounty } from "@Types";

import { EditWinnersState } from "@States";

const edit_winners = async (body: string) => {
    const response = await fetch(`/api/edit/winners`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = ({ amount, claims, id }: Bounty) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_edit = async (state: EditWinnersState) => {
        set_is_loading(true);

        const claims = Object.entries(state).reduce((acc, [claim_id, amount]) => {
            acc.push({
                amount: amount ? parseInt(amount) : null,
                claim_id,
            });

            return acc;
        }, []);

        await edit_winners(
            JSON.stringify({
                bounty_id: id,
                claims,
            })
        );

        router.push(`/bounty/${id}`);
    };

    const initial_state: EditWinnersState = claims.reduce((acc, { amount, id }) => {
        acc[id] = amount?.toString() || "";

        return acc;
    }, {});

    return <Form amount={amount} claims={claims} handle_edit={handle_edit} initial_state={initial_state} is_loading={is_loading} />;
};

export default Component;
