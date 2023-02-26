import { Claim, TurboardioUser } from "@Types";

const convert = {
    link_to_video: (link: Claim["link"]): Claim["video"] => {
        if (!link) return null;

        // If it's a Twitch video
        if (link.startsWith("https://www.twitch.tv/videos/")) {
            const split = link.split("https://www.twitch.tv/videos/");

            if (split.length === 2)
                return {
                    id: split[1],
                    type: "twitch",
                };
        }

        // Test if it's a YouTube video
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

        const match = link.match(regExp);

        if (match && match[7].length == 11) {
            return {
                id: match[7],
                type: "youtube",
            };
        }

        return null;
    },
    turboardio_user: ({ pronouns, src_handle, twitch_handle, twitter_handle, user_id, user_name }: any): TurboardioUser => ({
        id: user_id,
        name: user_name,
        pronouns: pronouns || null,
        src_handle: src_handle || null,
        twitch_handle: twitch_handle || null,
        twitter_handle: twitter_handle || null,
    }),
};

export default convert;
