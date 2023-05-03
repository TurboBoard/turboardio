import Link from "next/link";

import { TurboardioUserContext } from "@Context/TurboardioUser";

import User from "@Svgs/User";

const Component = () => (
    <TurboardioUserContext.Consumer>
        {({ turboardio_user }) => {
            if (turboardio_user) {
                return (
                    <Link className="header-icon" href="/account">
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
