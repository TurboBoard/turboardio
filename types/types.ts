import { Entry as EntryType } from "contentful";

import { UserProfile } from "@auth0/nextjs-auth0/client";

export type Entry = EntryType<any>;

export type Bounties = BountiesItem[];

export type BountiesItem = {
    admin: {
        id: TurboardioUser["id"];
        name: TurboardioUser["name"];
    };
    amount: Bounty["amount"];
    created_at: Bounty["created_at"];
    end_date: string | null;
    game: Bounty["game"];
    id: Bounty["id"];
    is_claimed: Bounty["is_claimed"];
    is_expired: Bounty["is_expired"];
    pledges: Bounty["pledges"];
};

export type Bounty = {
    admin: TurboardioUser;
    amount: number | null;
    claims: Claim[] | null;
    created_at: string;
    details: string;
    end_date: string | null;
    game: Game;
    id: string;
    is_claimed: boolean;
    is_expired: boolean;
    pledges: Pledge[] | null;
    start_date: string | null;
};

export type Claim = {
    comment: string | null;
    created_at: string;
    id: string;
    is_winner: boolean;
    link: string;
    user: TurboardioUser;
    video?: Video;
};

export type Game = {
    cover: string;
    developers: string | null;
    id: number;
    platforms: string | null;
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

export type Winner = {
    amount: Bounty["amount"];
    user: TurboardioUser;
};
