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

                {bounties.length ? (
                    <Bounties bounties={bounties} />
                ) : (
                    /* prettier-ignore */
                    <p className="mb-0">There are currently no bounties for this game. Would you like to <Link className="generic-link" href={`/create/bounty/${game.id}`}>Create</Link> one?</p>
                )}
            </div>
        </section>
    </div>
);

export default Page;
