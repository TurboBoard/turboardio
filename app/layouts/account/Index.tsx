import Link from "next/link";

import { TurboardioUserContext } from "@Context/TurboardioUser";

import Loading from "@Components/Loading";
import User from "@Components/User";

import { AccountProps } from "@Props";

const Page = ({}: AccountProps) => (
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
                        <h1 className="mb-7">Welcome</h1>

                        <div className="mb-9">
                            <User {...turboardio_user} />
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h2>Your Details</h2>

                                <p>Edit your username, social links.</p>

                                <Link className="button fade-link inline-block" href="/edit/details">
                                    Edit Details
                                </Link>
                            </div>

                            <div>
                                <h2>Your Avatar</h2>

                                <p>Edit your avatar.</p>

                                <Link className="button fade-link inline-block" href="/edit/image">
                                    Edit Avatar
                                </Link>
                            </div>

                            <hr />

                            <div>
                                <h2>Your Bounties</h2>

                                <p>View and edit your bounties.</p>

                                <Link className="button fade-link inline-block" href="/account/bounties">
                                    Edit Bounties
                                </Link>
                            </div>

                            <hr />

                            <div>
                                <h2>Your Claims</h2>

                                <p>Edit and delete claims you've made.</p>

                                {/* <Link className="button fade-link inline-block" href="/account/claims">
                            Edit Claims
                        </Link> */}
                                <Link className="button inline-block button--disabled" href="/account/bounties">
                                    Coming Soon
                                </Link>
                            </div>

                            <hr />

                            <div>
                                <h2>Your Pledges</h2>

                                <p>Edit and delete your pledges.</p>

                                {/* <Link className="button fade-link inline-block" href="/account/pledges">
                            Edit Pledges
                        </Link> */}
                                <Link className="button inline-block button--disabled" href="/account/bounties">
                                    Coming Soon
                                </Link>
                            </div>

                            <hr />

                            <div>
                                <h3>Goodbye</h3>

                                <a className="button button--anchor" href="/api/auth/logout">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }}
    </TurboardioUserContext.Consumer>
);

export default Page;
