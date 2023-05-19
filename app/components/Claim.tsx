import Video from "@Svgs/Video";

import { Claim } from "@Types";

const Component = ({ comment, created_at, is_winner, link, user }: Claim) => (
    <div className="relative py-7">
        {is_winner && (
            <div className="jumbo">
                <div className="jumbo__text">winner</div>
            </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center">
            <div className="shrink-0 mb-6 sm:mb-0">
                <img alt={`{user.name} profile picture`} className="circle-image h-10 w-10 lg:h-11 lg:w-11" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user.id}.jpg`} />
            </div>

            <div className="sm:flex-1">{comment && <p className="mx-auto mb-0 px-6 text-center whitespace-pre-line">{comment}</p>}</div>

            <div className="absolute sm:static top-7 right-0 sm:flex sm:justify-end">
                <a className="fade-link block h-8 lg:h-9 text-byzantium" href={link} target="_blank">
                    <Video />
                </a>
            </div>
        </div>

        <div className="text-center">
            {/* prettier-ignore */}
            <small>
                Claim submitted on {created_at} by <span className="text-copy">{user.name}</span>
            </small>
        </div>
    </div>
);

export default Component;
