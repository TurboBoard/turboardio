import { Bounties, BountiesItem, Bounty, Claim, Game, Meta, Pledge, TurboardioUser } from "@Types";

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

export type DeleteBountyProps = {
    bounty: Bounty;
};

export type DeleteClaimProps = {
    bounty: Bounty;
    claim: Claim;
};

export type DeletePledgeProps = {
    bounty: Bounty;
    pledge: Pledge;
};

export type EditBountyProps = {
    bounty: Bounty;
};

export type EditClaimProps = {
    bounty: Bounty;
    claim: Claim;
};

export type EditPledgeProps = {
    bounty: Bounty;
    pledge: Pledge;
};

export type EditWinnersProps = {
    bounty: Bounty;
};

export type GameProps = {
    bounties: Bounties;
    game: Game;
    meta: Meta;
};

export type HomeProps = {
    featured: BountiesItem;
    latest_winning_claim: {
        comment: Claim["comment"];
        video: Claim["video"];
        winner: {
            amount: Bounty["amount"];
            user: TurboardioUser;
        };
    };
    leaderboard: {
        amount: Bounty["amount"];
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
