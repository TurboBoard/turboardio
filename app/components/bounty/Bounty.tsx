import Game from "@Components/Game";

import { LinkItUrl } from "react-linkify-it";

import { Bounty } from "@Types";

import { format } from "@Lib";

const Component = ({
    admin,
    amount,
    created_at,
    details,
    end_date,
    game,
    start_date,
}: {
    admin: Bounty["admin"];
    amount: Bounty["amount"];
    created_at: Bounty["created_at"];
    details: Bounty["details"];
    end_date: Bounty["end_date"];
    game: Bounty["game"];
    start_date: Bounty["start_date"];
}) => (
    <>
        <div className="flex justify-between mb-9">
            <Game {...game} />

            {amount && (
                <div className="hidden sm:block">
                    <div className="heading text-accent text-4xl lg:text-6xl">${amount}</div>
                </div>
            )}
        </div>

        <div className="space-y-8">
            <div>
                <h2>Details</h2>

                <div className="rte">
                    <LinkItUrl>
                        <p className="whitespace-pre-line">{details}</p>
                    </LinkItUrl>
                </div>

                <div>
                    {/* prettier-ignore */}
                    <small>
                        Bounty created on {created_at} by <span className="text-black">{admin.name}</span>
                    </small>
                </div>
            </div>

            {(start_date || end_date) && (
                <div className="grid grid-cols-2 space-x-8">
                    {start_date && (
                        <div>
                            <h3>Start Date</h3>

                            <p className="mb-0">{format.iso(start_date)}</p>
                        </div>
                    )}

                    {end_date && (
                        <div>
                            <h3>End Date</h3>

                            <p className="mb-0">{format.iso(end_date)}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    </>
);

export default Component;
