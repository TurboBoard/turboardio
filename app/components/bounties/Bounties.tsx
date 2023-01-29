import Link from "next/link";

import { Bounties, Pledge } from "@Types";

const Pledges = ({ pledges }: { pledges: Pledge[] }) => {
    const total = pledges.reduce((acc, { amount }) => acc + amount, 0);

    return (
        <div>
            <div className="heading text-accent text-5xl lg:text-6xl">${total}</div>

            <div className="hidden lg:flex lg:justify-end space-x-5 lg:mt-5">
                {pledges.map(({ user_id }) => (
                    <img key={user_id} alt="User profile picture" className="circle-image h-8 w-8" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user_id}.jpg`} />
                ))}
            </div>
        </div>
    );
};

const Component = ({ bounties }: { bounties: Bounties }) => {
    if (bounties.length === 0) {
        return (
            <div className="rte">
                {/* prettier-ignore */}
                <p className="mb-0">There are currently no bounties for this game. Would you like to <Link href="/create/bounty">Create</Link> one?</p>
            </div>
        );
    }

    return (
        <div className="divide-y">
            {bounties.map(({ admin, claimed, created_at, id, game, pledges }) => (
                <div key={id} className="relative py-7">
                    {claimed && (
                        <div className="jumbo">
                            <div className="jumbo__text">claimed</div>
                        </div>
                    )}

                    <Link className="fade-link" href={`/bounty/${id}`}>
                        <div className="flex justify-between items-center mb-5">
                            <div className="game">
                                <img alt={`{game.title} cover`} className="game__image" src={game.cover} />

                                <div>
                                    <div className="game__title">{game.title}</div>

                                    <div className="game__released">{game.released}</div>
                                </div>
                            </div>

                            {pledges && (
                                <div className="hidden xs:block">
                                    <Pledges pledges={pledges} />
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            {/* prettier-ignore */}
                            <small>
                                    Bounty created on {created_at} by <span className="text-black">{admin.name}</span>
                                </small>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Component;
