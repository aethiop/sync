import { gun, user } from "./db.js";

export async function generateRequestsCertificate() {
	let certificate = await SEA.certify(
		["*"],
		[{ "*": "requests" }],
		user._.sea,
		null,
		{}
	);

	user.get("cert/requests").put(certificate, ({ ok }) => {
		console.log("Request Certificate created");
	});
}
function generateMyCertificate() {}
function generateTheirCertificate() {}
export function sendRequest(pub) {
	console.log(user.is.pub);
	gun.user(pub)
		.get("cert/requests")
		.once((certificate) => {
			console.log(pub);
			gun.user(pub)
				.get("requests")
				.set(user.is.pub, null, { opt: { cert: certificate } });
		});
}
function acceptRequest(detail) {}
function rejectRequest(pub) {}
export function getRequests() {
	var requests = [];
	console.log("requests");
	user.get("requests")
		.map()
		.once(async (pub) => {
			gun.user(pub)
				.get("profile")
				.get("name")
				.once((name) => {
					requests.push({
						name: name,
						pub: pub,
					});
				});
		});
	return requests;
}
