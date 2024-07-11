import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'lib/index.ts'),
			formats: ['es'],
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
			// input: Object.fromEntries(
			// 	glob
			// 		.sync('lib/**/*.{ts,tsx}', {
			// 			ignore: ['lib/**/*.d.ts'],
			// 		})
			// 		.map(file => [
			// 			// The name of the entry point
			// 			// lib/nested/foo.ts becomes nested/foo
			// 			relative('lib', file.slice(0, file.length - extname(file).length)),
			// 			// The absolute path to the entry file
			// 			// lib/nested/foo.ts becomes /project/lib/nested/foo.ts
			// 			fileURLToPath(new URL(file, import.meta.url)),
			// 		])
			// ),
		},
	},
	resolve: {
		alias: {
			'@': '/src',
			'~': '/lib',
		},
	},
});
