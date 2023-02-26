import { Bounties, Bounty, Claim, Game, Meta, User, Winners } from "@Types";

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
    leaderboard: Winners;
    meta: Meta;
};

export type PageProps = {
    content: any;
    meta: Meta;
    title: string;
};

export type SearchProps = {};
