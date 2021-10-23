// import { Buffer } from "buffer";

export function uriToFile(url) {
	return fetch(url).then(async function (res) {
		return res.blob();
	});
}
// export const b64ToBlob = (b64Data, contentType, sliceSize) => {
// 	const byteCharacters = Buffer.from(b64Data).toString();
// 	const byteArrays = [];

// 	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
// 		const slice = byteCharacters.slice(offset, offset + sliceSize);

// 		const byteNumbers = new Array(slice.length);
// 		for (let i = 0; i < slice.length; i++) {
// 			byteNumbers[i] = slice.charCodeAt(i);
// 		}

// 		const byteArray = new Uint8Array(byteNumbers);
// 		byteArrays.push(byteArray);
// 	}

// 	const blob = new Blob(byteArrays, { type: contentType });
// 	return blob;
// };
