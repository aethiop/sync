// @ts-ignore
import { registerSW } from "virtual:pwa-register";

import App from "./App.svelte";
const app = new App({
	target: document.getElementById("app"),
});

const updateSW = registerSW();
export default app;
