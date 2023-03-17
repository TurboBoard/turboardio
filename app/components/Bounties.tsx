import Link from "next/link";

import { Bounties } from "@Types";

const Component = ({ bounties }: { bounties: Bounties }) => (
    <div className="divide-y divide-silver">
        {bounties.map(({ admin, amount, created_at, id, is_claimed, game, pledges }) => (
            <div key={id} className="relative py-7">
                {is_claimed && (
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

                        <div className="hidden xs:block">
                            {amount && <div className="heading text-accent text-5xl lg:text-6xl">${amount}</div>}

                            {pledges && (
                                <div className="hidden lg:flex lg:justify-end space-x-5 lg:mt-5">
                                    {pledges.map(({ user_id }) => (
                                        <img key={user_id} alt="User profile picture" className="circle-image h-8 w-8" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user_id}.jpg`} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center">
                        {/* prettier-ignore */}
                        <small>
                            Bounty created on {created_at} by {admin.name}
                        </small>
                    </div>
                </Link>
            </div>
        ))}
    </div>
);

export default Component;
