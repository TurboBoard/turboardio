import Claim from "@Components/bounty/Claim";
import Claims from "@Components/bounty/Claims";
import Details from "@Components/bounty/Details";
import Game from "@Components/igdb/Game";
import Pledge from "@Components/bounty/Pledge";
import Pledges from "@Components/bounty/Pledges";
import Winners from "@Components/Winners";

import { BountyProps } from "@Props";

const Page = ({ bounty: { admin, amount, claims, created_at, details, discord_link, end_date, game, id, pledges, start_date, winners } }: BountyProps) => {
    const is_claimed = winners?.length > 0;

    return (
        <div>
            {/* The Game and Bounty Details are always shown */}
            <section>
                <div className="flex justify-between mb-9">
                    <Game {...game} />

                    {amount && (
                        <div className="hidden sm:block">
                            <div className="heading text-accent text-4xl lg:text-6xl">${amount}</div>
                        </div>
                    )}
                </div>

                <Details admin={admin} created_at={created_at} details={details} discord_link={discord_link} end_date={end_date} start_date={start_date} />
            </section>

            <div className="gutter">
                <hr />
            </div>

            {/* Only show the winners if there are winners */}
            {is_claimed && (
                <>
                    <section>
                        <h2>Winner{winners.length > 1 && "s"}</h2>

                        <Winners winners={winners} />
                    </section>

                    <div className="gutter">
                        <hr />
                    </div>
                </>
            )}

            {/* Only show claims if there are claims */}
            {claims && (
                <>
                    <section>
                        <h2>Claims</h2>

                        <Claims claims={claims} />
                    </section>

                    <div className="gutter">
                        <hr />
                    </div>
                </>
            )}

            {/* Only show the claim form if the bounty has not been claimed */}
            {!is_claimed && (
                <>
                    <section>
                        <h2>Claim</h2>

                        <Claim bounty_id={id} />
                    </section>

                    <div className="gutter">
                        <hr />
                    </div>
                </>
            )}

            {/* Only show pledges if there are pledges */}
            {pledges && (
                <>
                    <section>
                        <h2>Pledges</h2>

                        <Pledges pledges={pledges} />
                    </section>

                    <div className="gutter">
                        <hr />
                    </div>
                </>
            )}

            {/* Only show pledge form if the bounty has not been claimed */}
            {!is_claimed && (
                <>
                    <section>
                        <h2>Pledge</h2>

                        <Pledge bounty_id={id} />
                    </section>
                </>
            )}
        </div>
    );
};

export default Page;
