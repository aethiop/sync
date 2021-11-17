// @ts-nocheck
import { tweened } from "svelte/motion";
import { gun, user } from "./db.js";
import { uriToFile } from "./helper.js";
export let downloading = tweened(0);
export let data = null;
export let uploading = tweened(0);
export async function sendFile(pub, folder, file) {
	console.log(folder, file);
	var file = user.get(folder).get(file);

	var cert = await gun
		.user(pub)
		.get("certificates")
		.get("friends")
		.get(user.is.pub);

	gun.user(pub)
		.get("shared")
		.get(file._.get)
		.put(
			file._.link,
			({ ok, err }) => {
				console.log(ok, err);
			},
			{ opt: { cert: cert } }
		);
}
export function uploadFile(folder, file) {
	var slice_size = 1024 * 1024;
	let length;
	let proof;

	if (file) {
		var reader = new FileReader();
		reader.onloadend = async function (e) {
			if (file.size <= slice_size) {
				slice_size = file.size;
			}
			let b64 = e.target.result;
			length = b64.length;
			proof = await SEA.work(b64, null, null, {
				name: "SHA-256",
			});
			user.get(folder)
				.get(file.name)
				.get("type")
				.put(file.type.split("/")[0]);
			user.get(folder).get(file.name).get("size").put(length);
			user.get(folder).get(file.name).get("proof").put(proof);
			user.get(folder)
				.get(file.name)
				.upload(b64, null, (progress) => {
					uploading.set(progress);
				});
		};
		reader.readAsDataURL(file);
	}
}

export async function getFile(folder, fileId) {
	downloading.set(0);
	user.get(folder)
		.get(fileId)
		.download(async (progress, file) => {
			downloading.set(progress);
			if (file) {
				var link = document.createElement("a");
				link.href = window.URL.createObjectURL(await uriToFile(file));
				link.download = fileId;
				link.click();
			}
		});
}

export async function restoreFile(folder, fileId) {
	let prevFolder = await user.get(folder).get(fileId).get("from");
	console.log(prevFolder);
	var trashed = user.get(folder).get(fileId);
	// @ts-ignore
	user.get(prevFolder).get(fileId).put(trashed);
	trashed.put(null);
}

export async function deleteFile(folder, fileId) {
	var ttl = 3600 * 30;
	var trashed = user.get(folder).get(fileId);
	user.get(folder).get(fileId).put(null);
	// @ts-ignore
	user.get("trash<?" + ttl)
		.get(fileId)
		.put(trashed);
	user.get("trash<?" + ttl)
		.get(fileId)
		.get("from")
		.put(folder);
}

export async function completeRemove(folder, fileId) {
	user.get(folder).get(fileId).put(null);
}
