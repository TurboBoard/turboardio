import { useState } from "react";

import Form from "@Components/forms/UserDetails";

import { TurboardioUser, User } from "@Types";

const update_details = async (updated_user: TurboardioUser) => {
    const response = await fetch("/api/user/update_details", {
        method: "post",
        body: JSON.stringify(updated_user),
    });

    return await response.json();
};

const Component = ({ email, refresh_user, user }: { email: User["email"]; refresh_user: Function; user: TurboardioUser }) => {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_update_details = async (updated_user: TurboardioUser) => {
        set_is_loading(true);

        const { success } = await update_details(updated_user);

        if (!success) return;

        await refresh_user();

        set_is_loading(false);
    };

    return (
        <div>
            <h2>User Details</h2>

            <Form email={email} handle_update={handle_update_details} is_loading={is_loading} user={user} />
        </div>
    );
};

export default Component;
