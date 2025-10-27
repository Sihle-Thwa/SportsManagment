import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',

    ],
    theme: {
        darkMode: ['class', '[data-theme="dark"]'],
        lightMode: ['class', '[data-theme="light"]'],
        defaultMode: ['class', '[data-theme="light"]'],
        extend: {},
    },
    plugins: [
        forms,
        typography,
        aspectRatio,

    ],
};

