import { TurboardioUser } from "@Types";

const convert = {
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
