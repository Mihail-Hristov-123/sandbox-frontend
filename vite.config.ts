import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            '/@api': {
                target: 'http://localhost:3500/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/@api/, ''),
            },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.ts',
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            thresholds: {
                lines: 70,
                functions: 70,
                branches: 70,
                statements: 70,
            },
        },
    },
});
