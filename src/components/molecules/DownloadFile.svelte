<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";
	import { onMount } from "svelte";
	import Button from "$atoms/Button.svelte";
	import File from "$atoms/File.svelte";
	import Dialog from "$molecules/Dialog.svelte";
	import { deleteFile, fetchFiles } from "$lib/cloud.js";
	import { getFile } from "$lib/cloud.js";
	import { addToast } from "$lib/store.js";
	import { user } from "$lib/db.js";
	import { uriToFile } from "$lib/helper.js";
	export let name;
	export let folder;

	let downloading = false;
	let data = null;
	let dataType;
	const deleteCompleted = () => {
		addToast({
			message: `File has been deleted! Its been moved to trash folder.`,
			type: "error",
			dismissible: true,
			timeout: 3000,
		});
	};
	onMount(async () => {
		dataType = await user.get(folder).get(name).get("type");
	});

	async function download() {
		getFile(folder, name);
	}
</script>

<File {name} type={dataType}>
	<Button left="share" variant="text" />
	<Dialog
		title="Are you sure you want to trash this file?"
		cancel="Cancel"
		message={`${name} will be stored in the trash folder for 30 days and will be removed after that`}
	>
		<Button
			variant="error"
			name="Delete"
			left="trash"
			on:click={() => {
				deleteFile(folder, name);
				deleteCompleted();
				fetchFiles(folder);
			}}
		/></Dialog
	>

	<Button left="download" variant="text" on:click={() => download()} />
</File>
