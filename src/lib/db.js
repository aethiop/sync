import GUN from "gun/gun";
import SEA from "gun/sea";
import "gun/axe";
import "gun/lib/then";
import "gun/lib/promise";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/lib/path";
// GUN.log.off = true;
import { writable } from "svelte/store";
GUN.chain.storeB64 = function (b64, opt, cb) {
	const gun = this;
	var length = b64.length;
	opt = opt || { size: 1024 * 1024 };
	// info.id = Gun.text.random();
	splitAndUpload(b64, 0);

	async function splitAndUpload(b64, chunks) {
		chunks = chunks || 0;
		var b64String = b64.slice(0, opt.size);

		if (b64.length) {
			gun.get(chunks).put(b64String, ({ ok, err }) => {
				if (ok) {
					chunks++;
					splitAndUpload(b64.slice(opt.size), chunks);
				}
			});
			cb((1 - b64.length / length) * 100);
		} else {
			cb(100);
			return;
		}
	}

	// gun.get("b64").map().val(function (b64) {
	// 	if (b64) {
	// 		this.put(b64);
	// 	}
	// });
};
export const gun = GUN({
	peers: [
		"http://localhost:8765/gun",
		// "https://marda.herokuapp.com/gun",
		// "http://gun-matrix.herokuapp.com/gun",
	],
	localStorage: false,
});
export const user = gun.user().recall({ sessionStorage: true });
export const username = writable("");
user.get("profile")
	.get("name")
	.on((v) => username.set(v));
