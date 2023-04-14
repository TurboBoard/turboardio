import { Bounties, Bounty, Claim, Game, Meta, User, Winner } from "@Types";

export type AccountProps = {
    user: User;
};

export type AccountBountiesProps = {
    bounties: Bounties;
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

export type CreateClaimProps = {
    bounty: Bounty;
    meta: Meta;
};

export type CreatePledgeProps = {
    bounty: Bounty;
    meta: Meta;
};

export type EditBountyProps = {
    bounty: Bounty;
};

export type EditDetailsProps = {};

export type EditImageProps = {
    user: User;
};

export type GameProps = {
    bounties: Bounties;
    game: Game;
    meta: Meta;
};

export type HomeProps = {
    bounty: Bounty;
    latest_winning_claim: {
        comment: Claim["comment"];
        video: Claim["video"];
        winner: Winner;
    };
    leaderboard: Winner[];
    meta: Meta;
};

export type PageProps = {
    content: any;
    meta: Meta;
    title: string;
};

export type SearchProps = {};
