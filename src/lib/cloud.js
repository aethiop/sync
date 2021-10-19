// @ts-nocheck
import { writable } from "svelte/store";
import { tweened } from "svelte/motion";
import { gun, user } from "./db.js";
import { uriToFile } from "./helper.js";
import { files } from "./store.js";
import FileSaver from "file-saver";
import { addToast, dismissToast } from "$lib/store";

export let downloading = false;
export let data = null;
export let progress = tweened(0);
let reader = {};
const downloadingToast = (fileId) => {
	addToast({
		id: fileId,
		message: `Downloading ${fileId}, Please Wait...`,
		type: "info",
		dismissible: false,
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
export async function uploadFile(folder, file) {
	var slice_size = 1024 * 1024;
	let length;
	let prev = user.get(folder);

	async function splitAndUpload(b64, proof) {
		var b64String = b64.slice(0, slice_size);

		if (b64.length) {
			progress.set((1 - b64.length / length) * 100);
			prev.put({
				data: b64String,
				checksum: await SEA.work(b64String, null, null, {
					name: "SHA-256",
				}),
			});
			prev = prev.get("next");

			splitAndUpload(b64.slice(slice_size), proof);
		} else {
			progress.set(100);
			user.get(folder).get(file.name).get("proof").put(proof);
		}
	}
	function upload() {
		if (file) {
			reader = new FileReader();
			createFile(folder, file.name, file.type);
			prev = user.get(folder).get(file.name).get("next");

			reader.onloadend = async function (e) {
				if (file.size <= slice_size) {
					slice_size = file.size;
				}
				let b64 = e.target.result;
				let proof = await SEA.work(b64, null, null, {
					name: "SHA-256",
				});
				length = b64.length;
				user.get(folder).get(file.name).get("size").put(length);
				splitAndUpload(b64, proof);
			};
			reader.readAsDataURL(file);
		}
	}

	upload();
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
	let chunks = [];
	// var next = user.get(folder).get(fileId);

	// async function chunkAndConcatnate(file, chunks) {
	// 	chunks = chunks || "";
	// 	if ((await next.get("next").get("data")) !== null) {
	// 		next = next.get("next");
	// 		chunks += await next.get("data");
	// 		chunkAndConcatnate(file, chunks);
	// 	} else {
	// 		return chunks;
	// 	}
	// }
	// async function chunkAndConcatnate(next, chunks) {
	// 	next = next.get("next") || next;
	// 	var chunks = chunks || "";
	//
	// 	if (
	// 		proof ===
	// 		(await SEA.work(chunks, null, null, {
	// 			name: "SHA-256",
	// 		}))
	// 	) {
	// 		return chunks;
	// 	}
	// 	next.get("data").once((chunk) => {
	// 		chunks += chunk;
	// 	});

	// 	return chunkAndConcatnate(next, chunks);
	// }
	downloadingToast(fileId);

	user.get(folder)
		.get(fileId)
		.get("proof")
		.on(async (hash) => {
			let next = user.get(folder).get(fileId);
			let size = await next.get("size");
			if (hash) {
				// while ((await next.get("next").get("data")) !== null) {
				// 	downloading = true;
				// 	next = next.get("next");
				// 	next.get("data").once((chunk) => {
				// 		chunks += chunk;
				// 	});
				// 	console.log(((chunks.length / size) * 100).toFixed(2), "%");
				// }

				(async function loop(i) {
					i = i || 0;
					next = next.get("next");
					if (
						hash ===
						(await SEA.work(chunks.join(""), null, null, {
							name: "SHA-256",
						}))
					) {
						dismissToast(fileId);
						uriToFile(chunks.join("")).then((blob) => {
							FileSaver.saveAs(blob, fileId);
						});
						downloadSuccess(fileId);
						return;
					} else {
						next.get("data").once((chunk) => {
							chunks[i] = chunk;
							console.log(
								((chunks.join("").length / size) * 100).toFixed(
									2
								),
								"%"
							);
						});
						loop(i + 1);
					}
				})();
			}
		});
	// console.log(chunks.length);
	// console.log(chunks.length);
	// while ((await next.get("next").get("data")) !== null) {
	// 	downloading = true;
	// 	next = next.get("next");
	// 	chunks += await next.get("data");

	// 	test.push(
	// 		await SEA.work(await next.get("data"), null, null, {
	// 			name: "SHA-256",
	// 		})
	// 	);
	// 	console.log(
	// 		await SEA.work(await next.get("data"), null, null, {
	// 			name: "SHA-256",
	// 		})
	// 	);
	// }
	// // console.log(test);
	// console.log(
	// 	await SEA.work(chunks, null, null, {
	// 		name: "SHA-256",
	// 	})
	// );
	// var chunks = await chunkAndConcatnate(next);
	// return chunks;
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
