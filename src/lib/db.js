import GUN from "gun";
import "gun/sea";
import "gun/axe";
import "gun/lib/promise";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import { writable } from "svelte/store";

export const gun = GUN({
	file: "radata",
	peers: ["http://localhost:8765/gun"],
	localStorage: false,
});
export const user = gun.user().recall({ sessionStorage: true });
export const username = writable("");

user.get("profile")
	.get("name")
	.on((v) => username.set(v));
