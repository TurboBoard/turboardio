import { useEffect, useState } from "react";

import UserDetails from "@Components/account/UserDetails";
import UserImage from "@Components/account/UserImage";

import { TurboardioUser, User } from "@Types";

const get_user = async (set_user: Function) => {
    const response = await fetch("/api/user/get_user");

    const { turboardio_user } = await response.json();

    if (turboardio_user) {
        set_user(turboardio_user);
    }
};

const Component = ({ email }: { email: User["email"] }) => {
    const [user, set_user] = useState<TurboardioUser | null>(null);

    useEffect(() => {
        get_user(set_user);
    }, []);

    const refresh_user = async () => await get_user(set_user);

    if (!user) return null;

    console.log("user", user.name);

    return (
        <div>
            <div className="mb-9">
                <UserDetails email={email} refresh_user={refresh_user} user={user} />
            </div>

            <UserImage user={user} />
        </div>
    );
};

export default Component;
