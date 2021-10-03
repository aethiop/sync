<script>
	// @ts-nocheck

	import { onMount } from "svelte";
	import Button from "$atoms/Button.svelte";
	import File from "$atoms/File.svelte";
	import Dialog from "$molecules/Dialog.svelte";
	import { completeRemove } from "$lib/cloud.js";

	import { user } from "$lib/db.js";
	export let name;
	export let folder;
	let dataType;
	onMount(async () => {
		dataType = await user.get(folder).get(name).get("type");
	});
</script>

<File {name} type={dataType}>
	<Dialog
		title="Completely remove file?"
		cancel="Cancel"
		message={`${name} will be completely removed`}
	>
		<Button
			variant="error"
			name="Delete"
			on:click={() => {
				completeRemove(folder, name);
			}}
		/></Dialog
	>
</File>
