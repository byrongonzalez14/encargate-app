/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.vue"],
    theme: {
        fontFamily: {
            "theme-heading": ["'Exo 2'", "sans-serif"],
            "theme-content": ["Alegreya Sans", "sans-serif"],
        },
        extend: {
            colors: {
                "theme-primary": "#FE5C19",
                "theme-secondary": "#D66121",
                "theme-grayish-blue": "#A09E92",
                "theme-dark-blue": "rgb(94, 65, 46)",
                "theme-dark-blue-tp": "rgba(94, 65, 46, 0.9)",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
