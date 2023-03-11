import { Bounties, Bounty, Claim, Game, Leaderboard, Meta, User } from "@Types";

export type AccountProps = {
    user: User;
};

export type AccountBountiesProps = {
    bounties: {
        created_at: Bounty["created_at"];
        id: Bounty["id"];
        is_claimed: Bounty["is_claimed"];
        game: Bounty["game"];
    }[];
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
    claim: Claim;
    leaderboard: Leaderboard;
    meta: Meta;
};

export type PageProps = {
    content: any;
    meta: Meta;
    title: string;
};

export type SearchProps = {};
