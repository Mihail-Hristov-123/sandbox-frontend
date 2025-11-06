import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1E40AF', // blue-800
                secondary: '#F59E0B', // amber-500
                accent: '#10B981', // green-500
            },
        },
    },
    plugins: [],
};

export default config;
