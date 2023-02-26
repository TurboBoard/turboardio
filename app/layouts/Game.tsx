import Link from "next/link";

import Bounties from "@Components/bounties/Bounties";

import { GameProps } from "@Props";

const Page = ({ bounties, game }: GameProps) => (
    <div>
        <section>
            <div className="mb-9">
                <div className="game">
                    <img className="game__image" alt={`${game.title} cover`} src={game.cover} />

                    <div>
                        <div className="game__title">{game.title}</div>

                        <div className="game__released">{game.released}</div>
                    </div>
                </div>
            </div>

            <div>
                <h2>Bounties</h2>

                <div className="mb-9">
                    {bounties.length ? (
                        <Bounties bounties={bounties} />
                    ) : (
                        /* prettier-ignore */
                        <p className="mb-0">There are currently no bounties for this game.</p>
                    )}
                </div>

                <div>
                    <Link className="button button--anchor" href={`/create/bounty/${game.id}`}>
                        Create {game.title} Bounty
                    </Link>
                </div>
            </div>
        </section>
    </div>
);

export default Page;
