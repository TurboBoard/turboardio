import { useEffect, useState } from "react";

const Loading = () => {
    const [dots, set_dots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            set_dots((prev) => {
                if (prev.length >= 3) return "";

                return `${prev}.`;
            });
        }, 750);

        return () => clearInterval(interval);
    }, []);

    return <span>Loading{dots}</span>;
};

export default Loading;
