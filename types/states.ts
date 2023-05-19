export type CreateBountyState = {
    amount: string;
    details: string;
    end_date: string;
    start_date: string;
};

export type CreateClaimState = {
    comment: string;
    link: string;
};

export type CreatePledgeState = {
    amount: string;
    checked: boolean;
};

export type ContactState = {
    email: string;
    message: string;
};

export type EditBountyState = {
    details: string;
    end_date: string;
    start_date: string;
};

export type EditClaimState = {
    comment: string;
    link: string;
};

export type EditPledgeState = {
    amount: string;
};

export type EditDetailsState = {
    name: string;
    pronouns: string;
    src_handle: string;
    twitch_handle: string;
    twitter_handle: string;
};
