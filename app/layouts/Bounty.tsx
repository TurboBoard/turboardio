import Claim from "@Components/bounty/Claim";
import Claims from "@Components/bounty/Claims";
import Discord from "@Svgs/Discord";
import Game from "@Components/igdb/Game";
import Pledge from "@Components/bounty/Pledge";
import Pledges from "@Components/bounty/Pledges";

import { BountyProps } from "@Props";

const Page = ({ bounty: { admin, claims, created_at, details, discord_link, game, id, pledges, prize, winning_claim } }: BountyProps) => (
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
                <div className="mt-7">
                    <h3>Links</h3>

                    <div className="flex space-x-6">
                        <a className="fade-link block h-8" href={discord_link} rel="noreferrer" target="_blank">
                            <Discord />
                        </a>
                    </div>
                </div>
            )}
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
