import Link from "next/link";

import Bounty from "@Components/Bounty";
import Claim from "@Components/Claim";
import Pledge from "@Components/Pledge";

import { BountyProps } from "@Props";

const Layout = ({ bounty }: BountyProps) => (
    <div>
        {/* Bounty Information */}
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        {/* Claims */}
        <section>
            <h2>Claims</h2>

            {bounty.claims ? (
                <div className="divide-y">
                    {bounty.claims.map((claim) => (
                        <Claim key={claim.id} {...claim} />
                    ))}
                </div>
            ) : (
                <p>There are no claims on this bounty.</p>
            )}

            {!bounty.is_locked && (
                <Link className="button button--anchor mt-7" href={`/create/claim/${bounty.id}`}>
                    Submit Claim
                </Link>
            )}
        </section>

        <div className="gutter">
            <hr />
        </div>

        {/* Pledges */}
        <section>
            <h2>Pledges</h2>

            {bounty.pledges ? (
                <div className="flex space-x-7 mb-7">
                    {bounty.pledges.map(({ amount, id, user_id }) => (
                        <Pledge key={id} amount={amount} user_id={user_id} />
                    ))}
                </div>
            ) : (
                <p>There are no pledges on this bounty.</p>
            )}

            {!bounty.is_locked && (
                <Link className="button button--anchor" href={`/create/pledge/${bounty.id}`}>
                    Create Pledge
                </Link>
            )}
        </section>
    </div>
);

export default Layout;
