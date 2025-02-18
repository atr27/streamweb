import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
    ],

    theme: {
        fontFamily: {
            poppins: 'Poppins, sans-serif'
        },
        extend: {
            colors: {
                "alerange": '#FB6908',
                "gray-1": '#B4B4B4',
                "gray-2": '#E2E0E0',
                "form-bg": '#212121',
            },
            screens: {
                'laptopLg': '1160px',
                'laptopXl': '1360px',
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
    ],
};
