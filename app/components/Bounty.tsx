import Countdown from "@Components/Countdown";
import Game from "@Components/Game";

import { LinkItUrl } from "react-linkify-it";

import { Bounty } from "@Types";

const Component = ({ admin, amount, created_at, details, end_date, game, start_date }: Bounty) => {
    const today = new Date().toISOString().substring(0, 10);

    return (
        <div>
            <div className="relative sm:flex sm:justify-between sm:space-x-7 mb-7 md:mb-8 lg:mb-9">
                <Game game={game} href={`/game/${game.id}`} />

                {amount && (
                    <div className="absolute sm:static top-0 right-0 z-10">
                        <div className="heading text-accent text-right">
                            <div className="text sm:text-xl md:text-2xl lg:text-3xl">Reward</div>
                            <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl">${amount}</div>
                        </div>
                    </div>
                )}
            </div>

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

            {(end_date || start_date) && (
                <div className="flex justify-between md:justify-start md:space-x-9">
                    {start_date && start_date > today && (
                        <div className="mt-8">
                            <h4 className="mb-5">Starts In</h4>

                            <strong>
                                <Countdown end_date={start_date} />
                            </strong>
                        </div>
                    )}

                    {end_date && (
                        <div className="mt-8">
                            <h4 className="mb-5">Expires In</h4>

                            <strong>{end_date < today ? <span>Expired</span> : <Countdown end_date={end_date} />}</strong>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Component;
