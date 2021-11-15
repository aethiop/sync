<script>
	// @ts-nocheck
	import Text from "$atoms/Text.svelte";
	import DownloadFile from "$molecules/DownloadFile.svelte";
	import Erase from "$molecules/Erase.svelte";
	import { user } from "$lib/db.js";
	import { onMount } from "svelte";
	export let folder;
	let store = {};
	user.get(folder)
		.map()
		.on(function (data, key) {
			if (data) {
				store[key] = data;
			} else {
				// gun.map() can return null (deleted) values for keys
				// if so, this else clause will update your local variable
				delete store[key];
				store = store;
			}
		});
	$: files = Object.entries(store);
	// onMount(() => {
	// 	fetchFiles(folder);
	// });
</script>

{#if files.length > 0}
	<div
		class="flex overflow-hidden w-full p-2 items-center flex-col space-y-4"
	>
		{#each files as [name, _]}
			{#if folder.slice(0, 5) == "trash"}
				<Erase {name} {folder} />
			{:else}
				<DownloadFile {name} {folder} />
			{/if}
		{/each}
	</div>
{:else}
	<div
		class="w-full h-full font-bold tracking-widest flex justify-center items-center"
	>
		<Text type=" body ">No files here...</Text>
	</div>
{/if}
