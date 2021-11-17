var Gun = typeof window !== "undefined" ? window.Gun : require("gun");

var secrets =
	typeof window !== "undefined"
		? window.secrets
		: require("./secrets.min.js");

// fetch any public keys from setup
Gun.chain.init3fa = function (cb) {
	var gun = this;
	var user = gun.user();
	var pubs = [];
	user.get("3fa")
		.map()
		.once((_, k) => {
			!pubs.includes(k) && pubs.push(k);
			cb(pubs);
		});
};

// Create a backup key and use shamirs sharing for splitting the key to the public keys
Gun.chain.setup3fa = async function (pubs, key) {
	var gun = this;
	var user = gun.user();
	if (user.is && pubs.length >= 3) {
		const backupKey = SEA.random(128).toString("hex");
		user.get("3fauth").put(await SEA.encrypt(key, backupKey));
		const pieces = secrets.share(backupKey, 5, 3);
		pubs.forEach(async (pub, index) => {
			const epub = await gun.get(`~${pub}`).get("epub").then();
			const encrypted = await SEA.encrypt(
				pieces[index],
				await SEA.secret(epub, key)
			);
			user.get("3fa").get(pub).put(encrypted);
		});
	}
};

//Callback returns a hash and password for requesting recovery
Gun.chain.forget3fa = async function (pub, cb) {
	var gun = this;
	var throwaway = await SEA.pair();
	var epriv = throwaway.epriv;
	var hash = await SEA.work(throwaway.pub, null, null, {
		name: "SHA-256",
		encode: "hex",
	});
	var enc = await SEA.encrypt(pub, throwaway);
	gun.get("forget").get(hash).put(enc);
	cb(epriv, hash);
};

// Use the 3fa to get the pub and the piece(backup key) decrypted
Gun.chain.help3fa = async function (hash, pass, key, cb) {
	var gun = this;
	var user = gun.user();
	var pub = await SEA.decrypt(await gun.get("forget").get(hash).then(), pass);
	var epub = await gun.get(`~${pub}`).get("epub").then();
	if (user.is) {
		var decrypted = await SEA.decrypt(
			await gun.user(pub).get("3fa").get(key.pub).then(),
			await SEA.secret(epub, key)
		);
		cb(pub, decrypted);
	}
};

// Wait for friends to sendback pieces to build up the bcakup key and return the key
Gun.chain.wait3fa = async function (pub, hash, cb) {
	var gun = this;
	var found = [];
	gun.get("approved")
		.get(hash)
		.map()
		.on(async (k) => {
			found = [...found, k];
			if (found.length == 3) {
				var backup = secrets.combine(found);
				var key = await SEA.decrypt(
					await gun.user(pub).get("3fauth").then(),
					backup
				);
				cb(key);
			}
		});
};
