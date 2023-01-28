import { Entry as EntryType } from "contentful";

import { UserProfile } from "@auth0/nextjs-auth0/client";

export type Entry = EntryType<any>;

export type Bounties = {
    admin: {
        id: TurboardioUser["id"];
        name: TurboardioUser["name"];
    };
    claimed: boolean;
    created_at: Bounty["created_at"];
    id: Bounty["id"];
    game: Bounty["game"];
    pledges: Bounty["pledges"];
}[];

export type Bounty = {
    admin: TurboardioUser;
    claims: Claim[] | null;
    created_at: string;
    details: string;
    game: Game;
    id: string;
    pledges: Pledge[] | null;
    prize: number | null;
    winning_claim: Claim | null;
};

export type Claim = {
    comment: string | null;
    created_at: string;
    id: string;
    link: string | null;
    user: TurboardioUser;
    video?: Video;
};

export type Game = {
    cover: string;
    id: number;
    released: number;
    title: string;
};

export type Meta = {
    description?: string;
    image?: string;
    title?: string;
    url: string;
};

export type Pledge = {
    amount: number;
    id: string;
    user_id: TurboardioUser["id"];
};

export type TurboardioUser = {
    id: string;
    name: string;
    pronouns: string | null;
    src_handle: string | null;
    twitch_handle: string | null;
    twitter_handle: string | null;
};

export interface User extends UserProfile {
    turboardio_user_id: string;
}

export type Video = {
    id: string;
    type: "twitch" | "youtube";
};
