import { Bounties, Bounty, Claim, Game, Meta, TurboardioUser, User } from "@Types";

export type AccountProps = {
    user: User;
};

export type BountiesProps = {
    bounties: Bounties;
    meta: Meta;
};

export type BountyProps = {
    bounty: Bounty;
    meta: Meta;
};

export type CreateBountyProps = {
    game: Game;
    meta: Meta;
};

export type GameProps = {
    bounties: Bounties;
    game: Game;
    meta: Meta;
};

export type HomeProps = {
    claim: Claim;
    leaderboard: {
        prize: Bounty["prize"];
        user: TurboardioUser;
    }[];
    meta: Meta;
};

export type PageProps = {
    content: any;
    meta: Meta;
    title: string;
};

export type SearchProps = {};
