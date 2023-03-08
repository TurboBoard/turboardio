import { TurboardioUserContext } from "@Context/TurboardioUser";

import Link from "next/link";

import User from "@Svgs/User";

const Component = () => (
    <TurboardioUserContext.Consumer>
        {({ turboardio_user }) => {
            if (turboardio_user) {
                return (
                    <Link className="fade-link block h-[17px] md:h-7 lg:h-[26px]" href="/account">
                        <User />
                    </Link>
                );
            }

            return (
                <a className="button fade-link" href="/api/auth/login">
                    Log In
                </a>
            );
        }}
    </TurboardioUserContext.Consumer>
);

export default Component;
