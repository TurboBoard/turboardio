import { useEffect, useState } from "react";

import User from "@Components/user/User";

import { TurboardioUser } from "@Types";

const get_user = async (set_user: Function) => {
    const response = await fetch("/api/account/get");

    const { turboardio_user } = await response.json();

    if (turboardio_user) {
        set_user(turboardio_user);
    }
};

const Component = () => {
    const [user, set_user] = useState<TurboardioUser | null>(null);

    useEffect(() => {
        get_user(set_user);
    }, []);

    if (!user) return null;

    return <User {...user} />;
};

export default Component;
