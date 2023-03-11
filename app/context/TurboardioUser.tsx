import { createContext, useEffect, useState } from "react";

export const TurboardioUserContext = createContext(null);

import { TurboardioUser } from "@Types";

const get_turboardio_user = async (set_user: Function) => {
    const response = await fetch("/api/get/turboardio_user");

    const { turboardio_user } = await response.json();

    if (turboardio_user) {
        set_user(turboardio_user);
    }
};

const handle_edit_details = async (body: string) => {
    const response = await fetch("/api/edit/details", {
        method: "post",
        body,
    });

    return await response.json();
};

export const TurboardioUserProvider = ({ children }) => {
    const [turboardio_user, set_turboardio_user] = useState(null);

    useEffect(() => {
        get_turboardio_user(set_turboardio_user);
    }, []);

    const edit_details = async ({
        name,
        pronouns,
        src_handle,
        twitch_handle,
        twitter_handle,
    }: {
        name: TurboardioUser["name"];
        pronouns: TurboardioUser["pronouns"];
        src_handle: TurboardioUser["src_handle"];
        twitch_handle: TurboardioUser["twitch_handle"];
        twitter_handle: TurboardioUser["twitter_handle"];
    }): Promise<boolean> => {
        const body: string = JSON.stringify({
            name,
            pronouns,
            src_handle,
            twitch_handle,
            twitter_handle,
        });

        const { success } = await handle_edit_details(body);

        if (!success) {
            throw new Error("Could not edit details.");
        }

        set_turboardio_user({
            ...turboardio_user,
            name,
            pronouns,
            src_handle,
            twitch_handle,
            twitter_handle,
        });

        return true;
    };

    return <TurboardioUserContext.Provider value={{ edit_details, turboardio_user }}>{children}</TurboardioUserContext.Provider>;
};
