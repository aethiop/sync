import GUN from "gun";
import SEA from "gun/sea";
import "gun/axe";
import "gun/lib/then";
import "gun/lib/promise";
import { writable } from "svelte/store";
export const gun = GUN({
	peers: ["http://localhost:3000/gun"],
	localStorage: false,
});
export const user = gun.user().recall({ sessionStorage: true });
export const username = writable("");
user.get("profile")
	.get("name")
	.on((v) => username.set(v));
