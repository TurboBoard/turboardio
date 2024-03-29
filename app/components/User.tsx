import Trophy from "@Svgs/Trophy";
import Twitch from "@Svgs/Twitch";
import Twitter from "@Svgs/Twitter";

import { TurboardioUser } from "@Types";

const Component = ({ id, name, pronouns, src_handle, twitch_handle, twitter_handle }: TurboardioUser) => (
    <div className="flex items-center space-x-7">
        <div>
            <img alt={`${name} profile picture`} className="circle-image h-10 w-10" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${id}.jpg`} />
        </div>

        <div>
            <div className="mb-6">
                <div className="heading text-accent text-3xl lg:text-4xl leading-none">{name}</div>

                {pronouns && (
                    <div className="mt-3">
                        <small>{pronouns}</small>
                    </div>
                )}
            </div>

            <div className="flex space-x-6">
                {src_handle && (
                    <a className="fade-link h-6.5 text-highlight" href={`https://www.speedrun.com/user/${src_handle}`} target="_blank">
                        <Trophy />
                    </a>
                )}

                {twitch_handle && (
                    <a className="fade-link h-6.5 text-highlight" href={`https://www.twitch.tv/${twitch_handle}`} target="_blank">
                        <Twitch />
                    </a>
                )}

                {twitter_handle && (
                    <a className="fade-link h-6.5 text-highlight" href={`https://twitter.com/${twitter_handle}`} target="_blank">
                        <Twitter />
                    </a>
                )}
            </div>
        </div>
    </div>
);

export default Component;
