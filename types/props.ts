import { Bounties, Bounty, User } from "@Types";

export type AccountProps = {
    user: User;
};

export type BountiesProps = {
    bounties: Bounties;
};

export type BountyProps = {
    bounty: Bounty;
};

export type CreateBountyProps = {};

export type PageProps = {
    content: any;
    title: string;
};
