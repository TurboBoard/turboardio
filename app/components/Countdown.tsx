import { useEffect, useState } from "react";

import { Bounty } from "@Types";

const Component = ({ end_date }: { end_date: Bounty["end_date"] }) => {
    const [countdown, set_countdown] = useState<string>("");

    useEffect(() => {
        const deadline = new Date(end_date);

        const interval = setInterval(() => {
            const now = new Date();

            const diff = deadline.getTime() - now.getTime();

            let days = diff / (24 * 60 * 60 * 1000);
            let hours = (days % 1) * 24;
            let mins = (hours % 1) * 60;
            let secs = (mins % 1) * 60;

            let string: string = `${Math.floor(mins)} min ${Math.floor(secs)} sec`;

            if (hours) string = `${Math.floor(hours)} hrs ${string}`;

            if (days) string = `${Math.floor(days)} days ${string}`;

            set_countdown(string);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <span>{countdown}</span>;
};

export default Component;
