import Gun from "gun/gun";
import SEA from "gun/sea";
import "gun/axe";
import "gun/lib/then";
import "gun/lib/promise";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/lib/path";
import "./3fa";
import "./sync";
GUN.log.off = true;
import { writable } from "svelte/store";

export const gun = Gun({
	peers: [
		"http://localhost:8765/gun",
		"https://marda.herokuapp.com/gun",
		"http://gun-matrix.herokuapp.com/gun",
	],
	localStorage: false,
});
export const user = gun.user().recall({ sessionStorage: true });
export const username = writable("");
user.get("profile")
	.get("name")
	.on((v) => username.set(v));
