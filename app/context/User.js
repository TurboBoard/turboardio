import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, set_user] = useState(null);

    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
