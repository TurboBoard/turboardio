import { useUser } from "@auth0/nextjs-auth0/client";

import Link from "next/link";

import User from "@Svgs/User";

const Component = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading || error) return null;

    if (user) {
        return (
            <Link className="opacity-link block h-[17px] md:h-7 lg:h-[26px]" href="/account">
                <User />
            </Link>
        );
    }

    return (
        <a className="button" href="/api/auth/login">
            Log In
        </a>
    );
};

export default Component;
