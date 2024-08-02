import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	if (mode === 'full-calendar') {
		return {
			plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
			build: {
				copyPublicDir: false,
				lib: {
					entry: resolve(__dirname, 'full-calendar/index.ts'),
					formats: ['es'],
				},
				rollupOptions: {
					external: ['react', 'react/jsx-runtime'],
				},
			},
			resolve: {
				alias: {
					'@': '/src',
					'~': '/lib',
				},
			},
		};
	}
	return {
		plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
		build: {
			copyPublicDir: false,
			lib: {
				entry: resolve(__dirname, 'lib/index.ts'),
				formats: ['es'],
			},
			rollupOptions: {
				external: ['react', 'react/jsx-runtime'],
			},
		},
		resolve: {
			alias: {
				'@': '/src',
				'~': '/lib',
			},
		},
	};
});
