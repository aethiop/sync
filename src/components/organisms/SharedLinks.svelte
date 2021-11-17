<script>
	// @ts-nocheck
	import Text from "$atoms/Text.svelte";
	import Button from "$atoms/Button.svelte";
	import File from "$atoms/File.svelte";
	import DownloadFile from "$molecules/DownloadFile.svelte";
	import Erase from "$molecules/Erase.svelte";
	import { gun, user } from "$lib/db.js";
	import { uriToFile } from "$lib/helper.js";
	import { onMount } from "svelte";
	export let folder;

	let store = {};
	user.get(folder)
		.map()
		.on(async function (data, key) {
			console.log(data, key);
			if (data) {
				store[key] = {
					data: data,
					type: await gun.get(data).get("type"),
				};
			} else {
				// gun.map() can return null (deleted) values for keys
				// if so, this else clause will update your local variable
				delete store[key];
				store = store;
			}
		});
	$: links = Object.entries(store);
	// onMount(() => {
	// 	fetchlinks(folder);
	// });
</script>

{#if links.length > 0}
	<div
		class="flex overflow-hidden w-full p-2 items-center flex-col space-y-4"
	>
		{#each links as [key, { data, type }]}
			<File name={key} {type}>
				<Button
					left="download"
					variant="text"
					on:click={() => {
						// if ($current == "") {
						gun.get(data).download(async (progress, file) => {
							console.log(progress);
							if (file) {
								var link = document.createElement("a");
								link.href = window.URL.createObjectURL(
									await uriToFile(file)
								);
								link.download = key;
								link.click();
								// download(file, key);
							}
						});
					}}
				/>
			</File>

			<!-- {#if folder.slice(0, 5) == "trash"}
				<Erase {name} {folder} />
			{:else}
				<DownloadFile {name} {folder} />
			{/if} -->
		{/each}
	</div>
{:else}
	<div
		class="w-full h-full font-bold tracking-widest flex justify-center items-center"
	>
		<Text type=" body ">No links here...</Text>
	</div>
{/if}
