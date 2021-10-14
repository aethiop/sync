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
	<Icon class="cursor-pointer mx-2" name="share" />
	<Dialog
		title="Are you sure you want to trash this file?"
		cancel="Cancel"
		message={`${name} will be stored in the trash folder for 30 days and will be removed after that`}
	>
		<Button
			variant="error"
			name="Delete"
			icon="trash"
			on:click={() => {
				deleteFile(folder, name);
				deleteCompleted();
				fetchFiles(folder);
			}}
		/></Dialog
	>
	{#if !data}
		{#if downloading}
			<svg
				class="animate-spin h-5 w-5 text-primary"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		{:else}
			<Icon
				class="cursor-pointer mx-2"
				name="download"
				on:click={() => download()}
			/>
		{/if}
	{:else}
		<Icon
			class="cursor-pointer mx-2"
			name="download"
			on:click={() => download()}
		/>
	{/if}
</File>
