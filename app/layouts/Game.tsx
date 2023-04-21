import Link from "next/link";

import Game from "@Components/Game";
import BountiesItem from "@Components/BountiesItem";

import { GameProps } from "@Props";

const Layout = ({ bounties, game }: GameProps) => (
    <div>
        <section>
            <div className="mb-9">
                <Game game={game} href={null} />
            </div>

            <div>
                <h2>Bounties</h2>

                <div className="mb-9">
                    {bounties.length ? (
                        <div className="divide-y">
                            {bounties.map((bounties_item) => (
                                <BountiesItem key={bounties_item.id} {...bounties_item} />
                            ))}
                        </div>
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

export default Layout;
