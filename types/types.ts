import { Entry as EntryType } from "contentful";

import { UserProfile } from "@auth0/nextjs-auth0/client";

export type Entry = EntryType<any>;

export type Bounty = {
    admin: TurboardioUser;
    claimed: boolean;
    details: string;
    game: Game;
    id: string;
    winning_claim?: Claim;
};

export type Bounties = {
    claimed: Bounty["claimed"];
    id: Bounty["id"];
    game: Bounty["game"];
    pledges?: {
        amount: Pledge["amount"];
        user_id: Pledge["user"]["id"];
    }[];
}[];

export type Claim = {
    user: TurboardioUser;
};

export type Game = {
    cover: string;
    id: number;
    released: number;
    title: string;
};

export type Pledge = {
    amount: number;
    user: TurboardioUser;
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
