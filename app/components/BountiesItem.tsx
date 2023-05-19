import Countdown from "@Components/Countdown";
import Game from "@Components/Game";

import { BountiesItem } from "@Types";

const Jumbo = ({ is_claimed, is_expired }: { is_claimed: BountiesItem["is_claimed"]; is_expired: BountiesItem["is_expired"] }) => {
    if (is_claimed)
        return (
            <div className="jumbo">
                <div className="jumbo__text">claimed</div>
            </div>
        );

    if (is_expired)
        return (
            <div className="jumbo">
                <div className="jumbo__text">expired</div>
            </div>
        );

    return null;
};

const Component = ({ admin, amount, created_at, end_date, game, is_claimed, is_expired, pledges }: BountiesItem) => (
    <div className="relative py-7 lg:py-8">
        <Jumbo is_claimed={is_claimed} is_expired={is_expired} />

        <div className="sm:flex sm:items-center sm:space-x-7 mb-7">
            <div className="sm:flex-1 sm:shrink-0 mb-5 sm:mb-2">
                <Game game={game} href={null} />
            </div>

            <div className="absolute sm:static top-5 right-0 z-10">
                {amount && (
                    <div className="heading flex flex-col items-end text-accent">
                        <span className="reward sm:text-xl md:text-2xl lg:text-3xl">Reward</span>
                        <span className="reward text-2xl sm:text-4xl md:text-5xl lg:text-6xl">${amount}</span>
                    </div>
                )}

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
                Bounty created on {created_at} by {admin.name}. {end_date !== null && !is_expired && <span>Bounty will expire in <strong><Countdown end_date={end_date} /></strong></span>}
            </small>
        </div>
    </div>
);

export default Component;
