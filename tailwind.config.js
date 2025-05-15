/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{html,ts,scss}"],
    theme: {
        extend: {},
    },
    plugins: [],

    // Using sass
    mode: "jit",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};
