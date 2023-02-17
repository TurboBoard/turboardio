import { useEffect, useState } from "react";

import Details from "@Components/account/profile/Details";
import Image from "@Components/account/profile/Image";

import { TurboardioUser } from "@Types";
import { AccountProps } from "@Props";

const get_user = async (set_user: Function) => {
    const response = await fetch("/api/account/get");

    const { turboardio_user } = await response.json();

    if (turboardio_user) {
        set_user(turboardio_user);
    }
};

const Layout = ({ user: { email, turboardio_user_id } }: AccountProps) => {
    const [user, set_user] = useState<TurboardioUser | null>(null);

    useEffect(() => {
        get_user(set_user);
    }, []);

    if (!user) return null;

    return (
        <div>
            <section>
                <Details email={email} user={user} />
            </section>

            <section>
                <Image turboardio_user_id={turboardio_user_id} />
            </section>
        </div>
    );
};

export default Layout;
