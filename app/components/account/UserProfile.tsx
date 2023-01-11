import { useEffect, useState } from "react";

import UserDetails from "@Components/account/UserDetails";
import UserImage from "@Components/account/UserImage";

import { TurboardioUser, User } from "@Types";

const get_turboardio_user = async (turboardio_user_id: TurboardioUser["user_id"], set_state: Function) => {
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

const Component = ({ email, turboardio_user_id }: { email: User["email"]; turboardio_user_id: TurboardioUser["user_id"] }) => {
    const [turboardio_user, set_turboardio_user] = useState<TurboardioUser | null>(null);

    useEffect(() => {
        get_turboardio_user(turboardio_user_id, set_turboardio_user);
    }, []);

    if (!turboardio_user) return null;

    return (
        <div className="space-y-9">
            <UserDetails email={email} turboardio_user={turboardio_user} />

            <UserImage user_id={turboardio_user.user_id} />
        </div>
    );
};

export default Component;
