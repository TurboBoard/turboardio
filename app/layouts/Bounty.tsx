import Claims from "@Components/bounty/Claims";
import Game from "@Components/igdb/Game";
import Pledges from "@Components/bounty/Pledges";
import SubmitClaim from "@Components/claim/Submit";

import { BountyProps } from "@Props";

const Page = ({ bounty: { admin, claims, created_at, details, game, id, pledges, winning_claim } }: BountyProps) => {
    const total = pledges ? pledges.reduce((acc, { amount }) => acc + amount, 0) : null;

    return (
        <div>
            <section>
                <div className="flex justify-between mb-9">
                    <Game {...game} />

                    {total && (
                        <div className="hidden sm:block">
                            <div className="heading text-accent text-4xl lg:text-6xl">${total}</div>
                        </div>
                    )}
                </div>

                <div>
                    <h2>Bounty Details</h2>

                    <p className="mb-0 whitespace-pre-line">{details}</p>
                </div>
            </section>

            {claims && (
                <section>
                    <h2>Claims</h2>

                    <Claims claims={claims} winning_claim_id={winning_claim?.id || null} />
                </section>
            )}

            {!winning_claim && (
                <section>
                    <h2>Submit Claim</h2>

                    <SubmitClaim bounty_id={id} />
                </section>
            )}

            {pledges && (
                <section>
                    <h2>Pledges</h2>

                    <Pledges pledges={pledges} />
                </section>
            )}

            {/* <section>Submit Pledge</section> */}

            {/* <section>admin section</section> */}
        </div>
    );
};

export default Page;
