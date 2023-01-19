import Link from "next/link";

import { Bounties } from "@Types";

const SubComponent = ({ claimed, pledges }) => {
    if (claimed) {
        return <div className="heading hidden sm:block text-3xl uppercase">Claimed</div>;
    }

    if (!pledges) return null;

    const total = pledges.reduce((total, { amount }) => (total += amount), 0);

    return (
        <div>
            <div className="heading hidden sm:block text-4xl uppercase">${total}</div>

            {pledges.map(({ user_id }) => (
                <img alt="User image" className="user-image mb-7" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user_id}.jpg`} />
            ))}
        </div>
    );
};

const Component = ({ bounties }: { bounties: Bounties }) => (
    <div className="divide-y">
        {bounties.map(({ claimed, id, game, pledges }) => (
            <div key={id} className="py-7 first:pt-0 last:pb-0 border-grey">
                <div className="flex justify-between items-center">
                    <div>the game</div>
                    <div>other</div>
                </div>
                {/* <Link href={`/bounty/${id}`}>
                    <a className="fade-link flex items-center justify-between">
                        <div className="game">
                            <img className="game__image" alt={`${game.title} cover`} src={game.cover} />

                            <div>
                                <div className="game__title">{game.title}</div>

                                <div className="game__released">{game.released}</div>
                            </div>
                        </div>

                        <SubComponent claimed={claimed} pledges={pledges} />
                    </a>
                </Link> */}
            </div>
        ))}
    </div>
);

export default Component;
