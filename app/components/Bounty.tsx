import Countdown from "@Components/Countdown";
import Game from "@Components/Game";

import { LinkItUrl } from "react-linkify-it";

import { Bounty } from "@Types";

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
}) => {
    const today = new Date().toISOString().substring(0, 10);

    return (
        <div>
            <div className="mb-7 md:mb-8 lg:mb-9">
                <Game game={game} href={`/game/${game.id}`} />
            </div>

            <div className="space-y-8">
                <div>
                    <h2>Details</h2>

                    <div className="rte mb-6">
                        <LinkItUrl>
                            <p className="mb-0 whitespace-pre-line">{details}</p>
                        </LinkItUrl>
                    </div>

                    <div>
                        {/* prettier-ignore */}
                        <small>
                            Bounty created on {created_at} by {admin.name}.
                        </small>
                    </div>
                </div>

                {amount && (
                    <div>
                        <h3 className="mb-0">Reward</h3>

                        <div className="heading text-accent text-5xl md:text-6xl lg:text-7xl">${amount}</div>
                    </div>
                )}

                {(end_date || start_date) && (
                    <div className="flex justify-between md:justify-start md:space-x-9">
                        {start_date && start_date > today && (
                            <div>
                                <h4 className="mb-5">Starts In</h4>

                                <strong>
                                    <Countdown end_date={start_date} />
                                </strong>
                            </div>
                        )}

                        {end_date && (
                            <div>
                                <h4 className="mb-5">Expires In</h4>

                                <strong>{end_date < today ? <span>Expired</span> : <Countdown end_date={end_date} />}</strong>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Component;
