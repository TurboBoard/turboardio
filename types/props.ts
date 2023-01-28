import { Bounties, Bounty, Game, Meta, User } from "@Types";

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
    meta: Meta;
};

export type GameProps = {
    bounties: Bounties;
    game: Game;
    meta: Meta;
};

export type HomeProps = {
    meta: Meta;
};

export type PageProps = {
    content: any;
    meta: Meta;
    title: string;
};
