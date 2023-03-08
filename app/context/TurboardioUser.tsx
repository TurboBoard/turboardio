import { createContext, useEffect, useState } from "react";

export const TurboardioUserContext = createContext(null);

const get_turboardio_user = async (set_user: Function) => {
    const response = await fetch("/api/get/turboardio_user");

    const { turboardio_user } = await response.json();

    if (turboardio_user) {
        set_user(turboardio_user);
    }
};

export const TurboardioUserProvider = ({ children }) => {
    const [turboardio_user, set_turboardio_user] = useState(null);

    useEffect(() => {
        get_turboardio_user(set_turboardio_user);
    }, []);

    return <TurboardioUserContext.Provider value={{ turboardio_user }}>{children}</TurboardioUserContext.Provider>;
};
