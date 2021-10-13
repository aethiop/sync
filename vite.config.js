import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		VitePWA({
			includeAssets: [
				"favicon.svg",
				"favicon.ico",
				"robots.txt",
				"apple-touch-icon.png",
			],
			manifest: {
				name: "Sync - File Nebula",
				short_name: "Sync",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
				start_url: "/",
				theme_color: "#8F97FD",
			},
			workbox: {
				sourcemap: true,
			},
		}),
	],
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
