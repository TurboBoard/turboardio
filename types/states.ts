export type CreateBountyState = {
    details: string;
    end_date: string;
    start_date: string;
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

export type EditDetailsState = {
    name: string;
    pronouns: string;
    src_handle: string;
    twitch_handle: string;
    twitter_handle: string;
};
