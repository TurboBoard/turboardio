import { useEffect, useState } from "react";

import Details from "@Components/user/Details";
import Image from "@Components/user/Image";

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

    return (
        <div>
            <div className="mb-9">
                <Details email={email} refresh_user={refresh_user} user={user} />
            </div>

            <Image user={user} />
        </div>
    );
};

export default Component;
