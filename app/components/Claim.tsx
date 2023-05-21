import Video from "@Svgs/Video";

import { Claim } from "@Types";

const Component = ({ comment, created_at, is_winner, link, user }: Claim) => (
    <div className="relative py-7">
        {is_winner && (
            <div className="jumbo">
                <div className="jumbo__text">winner</div>
            </div>
        )}

        <div className="flex justify-center items-center">
            <div className="hidden xs:block shrink-0">
                <img alt={`{user.name} profile picture`} className="circle-image h-9 w-9 lg:h-10 lg:w-10" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user.id}.jpg`} />
            </div>

            <div className="w-full">{comment && <p className="mx-auto mb-0 px-6 text-center whitespace-pre-line">{comment}</p>}</div>

            <div className="flex-1 flex justify-end">
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
