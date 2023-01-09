import { useEffect, useState } from "react";

import Form from "@Components/forms/UserDetails";

import { TurboardioUser, User } from "@Types";

const get_user_details = async (turboardio_user_id: TurboardioUser["user_id"], set_state: Function) => {
    const response = await fetch("/api/user/get_details", {
        method: "post",
        body: JSON.stringify({
            turboardio_user_id,
        }),
    });

    const { turboardio_user } = await response.json();

    if (turboardio_user) {
        set_state(turboardio_user);
    }
};

const update_user_details = async (updated_turboardio_user: TurboardioUser) => {
    const response = await fetch("/api/user/update_details", {
        method: "post",
        body: JSON.stringify(updated_turboardio_user),
    });

    await response.json();
};

const Component = ({ email, turboardio_user_id }: { email: User["email"]; turboardio_user_id: TurboardioUser["user_id"] }) => {
    const [state, set_state] = useState<TurboardioUser | null>(null);

    useEffect(() => {
        get_user_details(turboardio_user_id, set_state);
    }, []);

    const handle_update = async ({ image_id, pronouns, src_handle, twitch_handle, twitter_handle, user_name }: TurboardioUser) => {
        const updated_user_details = {
            image_id,
            pronouns: pronouns || null,
            src_handle: src_handle || null,
            twitch_handle: twitch_handle || null,
            twitter_handle: twitter_handle || null,
            user_id: turboardio_user_id,
            user_name,
        };

        // If the values are the same then do not trigger an update
        if (JSON.stringify(updated_user_details) === JSON.stringify(state)) return;

        await update_user_details({
            image_id,
            pronouns,
            src_handle,
            twitch_handle,
            twitter_handle,
            user_id: turboardio_user_id,
            user_name,
        });
    };

    return (
        <div>
            <h2>User Details</h2>

            {state && <Form email={email} handle_update={handle_update} turboardio_user={state} />}
        </div>
    );
};

export default Component;
