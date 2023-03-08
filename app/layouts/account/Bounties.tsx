import { useEffect, useState } from "react";

import Link from "next/link";

import Edit from "@Svgs/Edit";
import Loading from "@Components/Loading";

import { AccountBountiesProps } from "@Props";

const get_bounties = async (set_bounties: Function) => {
    // const response = await fetch("/api/account/bounties/get");
    // const { bounties } = await response.json();
    // if (bounties) {
    //     set_bounties(bounties);
    // }
};

const Layout = () => {
    const [bounties, set_bounties] = useState<AccountBountiesProps["bounties"] | null>(null);

    useEffect(() => {
        get_bounties(set_bounties);
    }, []);

    if (!bounties)
        return (
            <section>
                <div className="h-[30vw]">
                    <Loading />
                </div>
            </section>
        );

    return (
        <section>
            <h1 className="mb-7">Your Bounties</h1>

            {bounties.length ? (
                <div className="divide-y">
                    {bounties.map(({ created_at, game, id, is_claimed }) => (
                        <div key={id} className="relative py-7 border-silver">
                            {is_claimed && (
                                <div className="jumbo">
                                    <div className="jumbo__text">claimed</div>
                                </div>
                            )}

                            <div className="flex justify-between items-center">
                                <div className="game">
                                    <Link className="fade-link hidden sm:block" href={`/game/${game.id}`} tabIndex={-1}>
                                        <img alt={`{game.title} cover`} className="game__image" src={game.cover} />
                                    </Link>

                                    <div>
                                        <Link className="fade-link game__title" href={`/game/${game.id}`}>
                                            {game.title}
                                        </Link>

                                        <div className="game__released">{game.released}</div>
                                    </div>
                                </div>

                                {!is_claimed && (
                                    <div>
                                        <Link className="fade-link block h-8.5 text-byzantium" href={`/edit/bounty/${id}`}>
                                            <Edit />
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                {/* prettier-ignore */}
                                <small>
                            Bounty created on {created_at}
                        </small>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You currently do not have </p>
            )}
        </section>
    );
};

export default Layout;
