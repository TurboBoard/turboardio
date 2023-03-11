import { Claim } from "@Types";

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
};

export default convert;
