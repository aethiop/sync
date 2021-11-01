<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";
	import Text from "$atoms/Text.svelte";
	import { onMount, onDestroy } from "svelte";
	import Button from "$atoms/Button.svelte";
	import File from "$atoms/File.svelte";
	import Dialog from "$molecules/Dialog.svelte";
	import {
		getFile,
		deleteFile,
		fetchFiles,
		uploading,
		downloading,
	} from "$lib/cloud.js";
	import { addToast, uploadQueue, downloadQueue } from "$lib/store.js";
	import { user } from "$lib/db.js";
	import { uriToFile } from "$lib/helper.js";
	export let name;
	export let folder;

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
	<div class="flex flex-row space-x-2" />
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

	<Button
		left="download"
		variant="text"
		on:click={() => {
			// if ($current == "") {
			download();
			// }
		}}
	/>
</File>
