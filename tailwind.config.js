/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        fontFamily: {
        'display': ['Montserrat', 'serif'],
        },
        extend: {
        animation: {
            shimmer: "shimmer 2s linear infinite",
        },
        keyframes: {
            shimmer: {
            from: {
                backgroundPosition: "0 0",
            },
            to: {
                backgroundPosition: "-200% 0",
            },
            },
        },
        },
    },
    plugins: [],
}

