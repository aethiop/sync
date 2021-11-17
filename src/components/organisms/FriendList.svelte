<script>
	// @ts-nocheck
	import Text from "$atoms/Text.svelte";
	import Avatar from "$atoms/Avatar.svelte";
	import Button from "$atoms/Button.svelte";
	import DownloadFile from "$molecules/DownloadFile.svelte";
	// import TrashFile from "$molecules/TrashFile.svelte";
	import { onMount } from "svelte";
	import { gun, user } from "$lib/db.js";
	import { sendFile } from "$lib/cloud.js";
	export let folder;
	export let file;
	export let share = false;
	let store = {};
	user.get("friends")
		.map()
		.on(function (data, key) {
			if (data) {
				gun.user(data)
					.get("profile")
					.get("name")
					.once((name) => {
						store[key] = {
							name: name,
							pub: data,
						};
					});
			} else {
				delete store[key];
				store = store;
			}
		});
	$: friends = Object.entries(store);
</script>

{#if friends.length > 0}
	<div
		class="flex overflow-hidden w-full p-2 items-center flex-col space-y-4"
	>
		{#each friends as [key, data]}
			<div
				class="flex w-full flex-row items-center justify-between bg-surface hover:bg-surface/75 px-2 rounded-2xl space-x-7"
			>
				<div class="flex flex-row space-x-4 items-center">
					<Avatar name={data.name} />
					<Text class="" type=" body ">{data.name}</Text>
				</div>
				{#if share}
					<Button
						left="send"
						on:click={() => {
							sendFile(data.pub, folder, file);
							// modal.hide();
						}}
						variant="text"
					/>
				{/if}
			</div>
		{/each}
	</div>
{:else}
	<div
		class="w-full h-full font-bold tracking-widest flex justify-center items-center"
	>
		<Text type=" body ">No friends around...</Text>
	</div>
{/if}
