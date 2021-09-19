// @ts-nocheck
import { user } from "./db.js";
import { profile, isAuthenticated } from "./store";

export const create = (name) => {
	if (name.length > 0) {
		SEA.pair().then((k) => {
			login(k);
			user.get("profile").get("name").put(name);
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
	profile.set({});
	isAuthenticated.set(false);
};
