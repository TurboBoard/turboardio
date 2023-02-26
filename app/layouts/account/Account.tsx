import Link from "next/link";

import User from "@Components/account/User";

import { AccountProps } from "@Props";

const Page = ({}: AccountProps) => (
    <div>
        <section>
            <h1 className="mb-7">Welcome</h1>

            <div className="mb-9">
                <User />
            </div>

            <div className="space-y-8">
                <div>
                    <h2>Your Profile</h2>

                    <p>Edit your username, image and social links.</p>

                    <Link className="button fade-link inline-block" href="/account/profile">
                        Edit Profile
                    </Link>
                </div>

                <hr />

                <div>
                    <h2>Your Bounties</h2>

                    <p>Manage your bounties and select the winning claim.</p>

                    {/* <Link className="button fade-link inline-block" href="/account/bounties">
                            Edit Bounties
                        </Link> */}
                    <Link className="button inline-block button--disabled" href="/account/bounties">
                        Coming Soon
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

export default Page;
