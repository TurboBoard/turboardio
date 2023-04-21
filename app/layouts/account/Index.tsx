import Link from "next/link";

import { TurboardioUserContext } from "@Context/TurboardioUser";

import Loading from "@Components/Loading";
import User from "@Components/User";

const Layout = () => (
    <TurboardioUserContext.Consumer>
        {({ turboardio_user }) => {
            if (!turboardio_user)
                return (
                    <section>
                        <Loading />
                    </section>
                );

            return (
                <div>
                    <section>
                        <div className="mb-9">
                            <h1 className="mb-7">Welcome</h1>

                            <User {...turboardio_user} />
                        </div>

                        <div className="mb-8">
                            <h3>Your Details</h3>

                            <p>Edit your username, pronouns and social links.</p>

                            <Link className="button fade-link inline-block" href="/edit/details">
                                Edit Details
                            </Link>
                        </div>

                        <div>
                            <h3>Your Avatar</h3>

                            <p>Change your avatar.</p>

                            <Link className="button fade-link inline-block" href="/edit/image">
                                Edit Avatar
                            </Link>
                        </div>
                    </section>

                    <div className="gutter">
                        <hr />
                    </div>

                    <section className="space-y-8">
                        <div>
                            <h3>Your Bounties</h3>

                            <p>View bounties you have created.</p>

                            <Link className="button fade-link inline-block" href="/account/bounties">
                                View Bounties
                            </Link>
                        </div>

                        <div>
                            <h3>Your Claims</h3>

                            <p>View bounties you've submitted claims for.</p>

                            <Link className="button fade-link inline-block" href="/account/claims">
                                View Claims
                            </Link>
                        </div>

                        <div>
                            <h3>Your Pledges</h3>

                            <p>View bounties you've pledged to.</p>

                            <Link className="button fade-link inline-block" href="/account/pledges">
                                View Pledges
                            </Link>
                        </div>
                    </section>

                    <div className="gutter">
                        <hr />
                    </div>

                    <section>
                        <h3>Goodbye</h3>

                        <a className="button button--anchor" href="/api/auth/logout">
                            Logout
                        </a>
                    </section>
                </div>
            );
        }}
    </TurboardioUserContext.Consumer>
);

export default Layout;
