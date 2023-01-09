import { Entry as EntryType } from "contentful";

import { UserProfile } from "@auth0/nextjs-auth0/client";

export type Entry = EntryType<any>;

export type TurboardioUser = {
    image_id: string;
    pronouns: string | null;
    src_handle: string | null;
    twitch_handle: string | null;
    twitter_handle: string | null;
    user_id: string;
    user_name: string;
};

export interface User extends UserProfile {
    turboardio_user_id: string;
}
