import { useEffect } from "react";

import SwitchOff from "@Svgs/SwitchOff";
import SwitchOn from "@Svgs/SwitchOn";

import { blur } from "@Lib";

const Component = () => {
    useEffect(() => {
        const previous_theme = localStorage.getItem("theme");

        if (previous_theme === "dark") {
            document.body.classList.add("dark");

            return;
        }

        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark");

            localStorage.setItem("theme", "dark");
        }
    }, []);

    const handle_click = () => {
        blur();

        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");

            localStorage.removeItem("theme");

            return;
        }

        document.body.classList.add("dark");

        localStorage.setItem("theme", "dark");
    };

    return (
        <button className="fade-link h-8" onClick={handle_click}>
            <span className="h-full block dark:hidden">
                <SwitchOn />
            </span>

            <span className="h-full hidden dark:block">
                <SwitchOff />
            </span>
        </button>
    );
};

export default Component;
