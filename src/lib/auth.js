// @ts-nocheck
import { user, username } from "./db.js";
import { profile, isAuthenticated } from "./store";
import { generateRequestsCertificate } from "./friend.js";

export const create = (name) => {
	if (name.length > 0) {
		SEA.pair().then((k) => {
			login(k);
			generateRequestsCertificate(user);
			user.get("profile")
				.get("name")
				.put(name, ({ ok }) => {
					console.log("Username has been created");
				});
		});
	}
};

export const login = async (key) => {
	key = typeof key === "string" ? JSON.parse(key) : key;

	user.auth(key);
	console.log(JSON.stringify(key));
	if (user.is) {
		console.log(user.is);
		profile.set({
			username: await user.get("profile").get("name"),
			key: key,
		});
		localStorage.setItem("key", JSON.stringify(key));
		isAuthenticated.set(true);
	}
};

export const logout = () => {
	user.leave();
	localStorage.clear();
	isAuthenticated.set(false);
	profile.set({});
	username.set("");
};
