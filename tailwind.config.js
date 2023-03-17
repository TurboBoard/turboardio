/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                byzantium: "#660099",
                dark: "#171717", // Neutral 900
                grey: "#71717a", // Neutral 500
                silver: "#b7b7bc", // Grey with 50% lightened
                light: "#fafafa", // Neutral 50
                pink: "#FF3399",
                teal: "#0cc",
                warning: "#F43F5E",
            },
        },
        fontFamily: {
            body: ["Mona Sans"],
            heading: ["Racing Sans One", "cursive"],
        },
        screens: {
            xs: "460px",
            ...defaultTheme.screens,
        },
        spacing: {
            0: "0px",
            1: "1px",
            2: "2px",
            3: "3px",
            4: "5px",
            5: "8px",
            6: "13px",
            6.5: "18px",
            7: "21px",
            8: "34px",
            8.5: "44px",
            9: "55px",
            10: "89px",
            10.5: "116px",
            11: "144px",
            12: "233px",
            13: "377px",
            14: "610px",
            15: "987px",
        },
    },
    plugins: [],
};
