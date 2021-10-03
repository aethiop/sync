import { writable } from "svelte/store";
import { tweened } from "svelte/motion";
import { user } from "./db.js";
import { files } from "./store.js";

export let downloading = false;
export let data = null;
export let progress = tweened(0);
let reader = {};

export function uploadFile(folder, file) {
	var slice_size = 1024 * 1024 || slice_size;

	let prev = user.get(folder);

	function splitAndUpload(start, b64) {
		var next_slice = start + slice_size + 1;
		var b64String = b64.slice(start, next_slice);
		if (next_slice <= b64.length) {
			progress.set(Math.floor(((start + slice_size) / b64.length) * 100));
			prev.put({ data: b64String });
			prev = prev.get("next");
			splitAndUpload(next_slice, b64);
		} else {
			progress.set(100);
		}
	}
	function upload() {
		if (file) {
			reader = new FileReader();
			createFile(folder, file.name, file.type);
			prev = user.get(folder).get(file.name).get("next");
			chunkUpload(0);
		}
	}
	function chunkUpload(start) {
		reader.onloadend = function (e) {
			if (file.size <= slice_size) {
				slice_size = file.size;
			}
			splitAndUpload(start, e.target.result);
		};
		reader.readAsDataURL(file);
	}
	fetchFiles(folder);

	return upload();
}

export function fetchFiles(folder) {
	var data = [];
	files.set([]);
	user.get(folder)
		.map()
		.once(async (d, name) => {
			if (d) {
				data = [...data, { name: name, folder: folder }];
				files.set(data);
			}
		});
	data = [];
}

export async function getFile(folder, fileId) {
	let chunks = "";
	var next = user.get(folder).get(fileId);
	while ((await next.get("next").get("data")) != null) {
		downloading = true;
		next = next.get("next");
		chunks += await next.get("data");
	}
	return chunks;
}

export function createFile(folder, name, type) {
	user.get(folder).get(name).get("type").put(type.split("/")[0]);
}

export async function restoreFile(folder, fileId) {
	let prevFolder = await user.get(folder).get(fileId).get("from");
	console.log(prevFolder);
	var trashed = user.get(folder).get(fileId);
	// @ts-ignore
	user.get(prevFolder).get(fileId).put(trashed);
	trashed.put(null);
	fetchFiles(folder);
}

// export async function deleteFile(folder, fileId) {
// 	var trashed = user.get(folder).get(fileId);
// 	user.get(folder).get(fileId).put(null);
// 	trashed.get("from").put(folder);
// 	var type = trashed.get("type");
// 	createFile("trash<?30", fileId, await type);
// 	user.get("trash<?30").get(fileId).put(trashed);
// 	fetchFiles(folder);
// }

// export async function completeRemove(folder, fileId) {
// 	user.get(folder).get(fileId).put(null);
// 	fetchFiles(folder);
// }
export async function deleteFile(folder, fileId) {
	var ttl = 3600 * 30;
	var trashed = user.get(folder).get(fileId);
	var type = await trashed.get("type");
	user.get(folder).get(fileId).put(null);
	// @ts-ignore
	user.get("trash<?" + ttl)
		.get(fileId)
		.get("type")
		.put(type.split("/")[0]);
	user.get("trash<?" + ttl)
		.get(fileId)
		.get("from")
		.put(folder);
	user.get("trash<?" + ttl)
		.get(fileId)
		.put(trashed);
	fetchFiles(folder);
}

export async function completeRemove(folder, fileId) {
	user.get(folder).get(fileId).put(null);
	fetchFiles(folder);
}
