// @ts-nocheck
import { tweened } from "svelte/motion";
import { writable } from "svelte/store";
import { gun, user } from "./db.js";
import { uriToFile } from "./helper.js";
import { downloadQueue, files, uploadQueue } from "./store.js";
import FileSaver from "file-saver";
import { addFile, addToast, dismissToast } from "$lib/store";
import Gun from "gun/gun";

export let downloading = tweened(0);
export let data = null;
export let uploading = tweened(0);
const downloadingToast = (fileId) => {
	addToast({
		id: fileId,
		message: `Downloading ${fileId}, Please Wait...`,
		type: "info",
		dismissible: true,
		timeout: 1000,
	});
};

const downloadSuccess = (fileId) => {
	addToast({
		message: `${fileId} Downloaded Successfully!`,
		type: "success",
		dismissible: true,
		timeout: 3000,
	});
};

export function uploadFile(folder, file) {
	var slice_size = 1024 * 1024;
	let length;
	let proof;
	uploadQueue.set(file.name);
	var prev = user.get(folder).get(file.name);

	function upload() {
		if (file) {
			var reader = new FileReader();
			createFile(folder, file.name, file.type);

			reader.onloadend = async function (e) {
				if (file.size <= slice_size) {
					slice_size = file.size;
				}
				let b64 = e.target.result;
				length = b64.length;
				proof = await SEA.work(b64, null, null, {
					name: "SHA-256",
				});
				user.get(folder).get(file.name).get("size").put(length);
				user.get(folder).get(file.name).get("proof").put(proof);
				user.get(folder)
					.get(file.name)
					.storeB64(b64, null, (progress) => {
						uploading.set(progress);
					});
			};
			reader.readAsDataURL(file);
		}
	}

	upload();
}

// export function fetchFiles(folder) {
// 	var data = [];
// 	user.get(folder)
// 		.map()
// 		.once(async (d, name) => {
// 			if (d) {
// 				data = [...data, { name: name, folder: folder }];
// 				addFile({ name: name, folder: folder });
// 			}
// 		});
// }

export async function getFile(folder, fileId) {
	var next = user.get(folder).get(fileId);
	let proof = await next.get("proof");
	let size = await next.get("size");
	downloadingToast(fileId);
	downloading.set(0);
	downloadQueue.set(fileId);
	(async function loop(i, chunks) {
		i = i || 0;
		chunks = chunks || [];
		// let chunk = await next.get(i);

		let currentProof = await SEA.work(chunks.join(""), null, null, {
			name: "SHA-256",
		});
		next.get(i).once((chunk) => {
			if (chunk) {
				chunks[i] = chunk;
				downloading.set((chunks.join("").length / size) * 100);
				console.log(
					"Download Progress: ",
					((chunks.join("").length / size) * 100).toFixed(2),
					"%"
				);
				loop(i + 1, chunks);
			} else {
				if (size === chunks.join("").length && proof === currentProof) {
					console.log("DONE");
					downloadQueue.set("");
					downloading.set(100);
					uriToFile(chunks.join("")).then((blob) => {
						FileSaver.saveAs(blob, fileId);
					});
					downloadSuccess(fileId);
					return chunks.join("");
				}
				loop(i, chunks);
			}
		});
	})();
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
