import { TurboardioUser } from "@Types";

const convert = {
    link_to_twitch_id: (link: string): string | null => {
        if (!link) return null;

        if (link.startsWith("https://www.twitch.tv/videos/")) {
            const split = link.split("https://www.twitch.tv/videos/");

            if (split.length === 2) return split[1];
        }

        return null;
    },
    link_to_youtube_id: (link: string): string | null => {
        if (!link) return null;

        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

        const match = link.match(regExp);

        return match && match[7].length == 11 ? match[7] : null;
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
