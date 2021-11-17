<script>
	// @ts-nocheck

	import { onMount } from "svelte";
	import Icon from "$atoms/Icon.svelte";
	import Button from "$atoms/Button.svelte";
	import File from "$atoms/File.svelte";
	import Dialog from "$molecules/Dialog.svelte";
	import { restoreFile, completeRemove } from "$lib/cloud.js";

	import { user } from "$lib/db.js";
	import { addToast } from "$lib/store";
	export let name;
	export let type;
	let dataType;
	onMount(async () => {
		dataType = await gun.get(key).get("type");
	});
	const removeCompleted = () => {
		addToast({
			message: `File has been removed`,
			type: "error",
			dismissible: true,
			timeout: 3000,
		});
	};
	const restoreCompleted = () => {
		addToast({
			message: `File has been restored`,
			type: "info",
			dismissible: true,
			timeout: 3000,
		});
	};
</script>

<File {name} type={dataType}>
	<Icon
		class="mx-2 cursor-pointer"
		name="refresh"
		on:click={() => {
			console.log(folder);
			restoreFile(folder, name);
			restoreCompleted();
		}}
	/>
	<Dialog
		let:close
		title="Completely remove file?"
		cancel="Cancel"
		message={`${name} will be completely removed`}
	>
		<Button
			variant="error"
			name="Delete"
			on:click={() => {
				completeRemove(folder, name);
				removeCompleted();
				close();
			}}
		/></Dialog
	>
</File>
