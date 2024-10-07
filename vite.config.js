// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://f3f6-189-203-247-6.ngrok-free.app/', // El servidor Flask
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
