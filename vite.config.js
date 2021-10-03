import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			$src: path.resolve("./src"),
			$theme: path.resolve("./src/theme"),
			$assets: path.resolve("./src/assets"),
			$pages: path.resolve("./src/pages"),
			$atoms: path.resolve("./src/components/atoms"),
			$molecules: path.resolve("./src/components/molecules"),
			$organisms: path.resolve("./src/components/organisms"),
			$templates: path.resolve("./src/components/templates"),
			$lib: path.resolve("./src/lib"),
		},
	},
});
