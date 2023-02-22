// @ts-nocheck
import dynamic from "next/dynamic";

import Claim from "@Components/bounty/Claim";
import Claims from "@Components/bounty/Claims";
import Discord from "@Svgs/Discord";
import Game from "@Components/igdb/Game";
import Pledge from "@Components/bounty/Pledge";
import Pledges from "@Components/bounty/Pledges";

const Date = dynamic(() => import("@Components/bounty/Date"), {
    ssr: false,
});

import { BountyProps } from "@Props";

const Page = ({ bounty: { admin, claims, created_at, details, discord_link, end_date, game, id, pledges, prize, start_date, winning_claim } }: BountyProps) => (
    <div>
        <section>
            <div className="flex justify-between mb-9">
                <Game {...game} />

                {prize && (
                    <div className="hidden sm:block">
                        <div className="heading text-accent text-4xl lg:text-6xl">${prize}</div>
                    </div>
                )}
            </div>

            <div className="space-y-7">
                <div>
                    <h2>Details</h2>

                    <p className="whitespace-pre-line">{details}</p>

                    <div>
                        {/* prettier-ignore */}
                        <small>
                            Bounty created on {created_at} by <span className="text-black">{admin.name}</span>
                        </small>
                    </div>
                </div>

                {discord_link && (
                    <div>
                        <h3>Links</h3>

                        <div className="flex space-x-6">
                            <a className="fade-link block h-8" href={discord_link} rel="noreferrer" target="_blank">
                                <Discord />
                            </a>
                        </div>
                    </div>
                )}

                {(start_date || end_date) && (
                    <div className="grid grid-cols-2 space-x-8">
                        {start_date && (
                            <div>
                                <h3>Start Date</h3>

                                <Date date_string={start_date} />
                            </div>
                        )}

                        {end_date && (
                            <div>
                                <h3>End Date</h3>

                                <Date date_string={end_date} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>

        <section>
            <h2>Claims</h2>

            <Claims claims={claims} winning_claim_id={winning_claim?.id || null} />
        </section>

        <section>
            <h2>Claim</h2>

            <Claim bounty_id={id} claimed={winning_claim ? true : false} />
        </section>

        <section>
            <h2>Pledges</h2>

            <Pledges pledges={pledges} />
        </section>

        <section>
            <h2>Pledge</h2>

            <Pledge bounty_id={id} claimed={winning_claim ? true : false} />
        </section>
    </div>
);

export default Page;
