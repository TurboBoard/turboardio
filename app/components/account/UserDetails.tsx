import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Components/forms/UserDetails";

import { debounce } from "lodash";

import { TurboardioUser, User } from "@Types";

const _update_user_details = async (data: TurboardioUser, set_is_loading: Function) => {
    const response = await fetch("/api/user/update_details", {
        method: "post",
        body: JSON.stringify(data),
    });

    const { success } = await response.json();

    if (success) {
        set_is_loading(false);
    }
};

const update_user_details = debounce(_update_user_details, 250);

const Component = ({ email, turboardio_user, update_turboardio_user }: { email: User["email"]; turboardio_user: TurboardioUser; update_turboardio_user: Function }) => {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_update = async (data: TurboardioUser) => {
        set_is_loading(true);

        await update_user_details(data, set_is_loading);
    };

    return (
        <div>
            <h2>User Details</h2>

            <Form email={email} handle_update={handle_update} is_loading={is_loading} turboardio_user={turboardio_user} />
        </div>
    );
};

export default Component;
