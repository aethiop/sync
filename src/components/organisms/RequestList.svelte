<script>
	// @ts-nocheck
	import Text from "$atoms/Text.svelte";
	import Avatar from "$atoms/Avatar.svelte";
	import DownloadFile from "$molecules/DownloadFile.svelte";
	// import TrashFile from "$molecules/TrashFile.svelte";
	import { gun, user } from "$lib/db.js";
	import { onMount } from "svelte";
	import { getRequests, acceptRequest, rejectRequest } from "$lib/friend.js";
	import ProfileCard from "$molecules/ProfileCard.svelte";
	import Button from "../atoms/Button.svelte";
	import { writable, derived } from "svelte/store";

	let store = {};

	user.get("requests")
		.map()
		.on(async function (data, key) {
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
				// gun.map() can return null (deleted) values for keys
				// if so, this else clause will update your local variable
				delete store[key];
				store = store;
			}
		});

	$: requests = Object.entries(store);
</script>

{#if requests && requests.length > 0}
	<div
		class="flex overflow-hidden w-full p-2 items-center flex-col space-y-4"
	>
		{#each requests as [key, data]}
			<div
				class="flex  w-full flex-row items-center justify-between space-x-2 rounded-xl bg-surface pt-2 px-4"
			>
				<div class="flex flex-row items-center space-x-7">
					<Avatar name={data.name} />
					<Text class="" type=" body ">{data.name}</Text>
				</div>
				<div class="flex flex-row">
					<Button
						variant="text"
						left="check"
						on:click={() => {
							acceptRequest(data.pub, key);
						}}
					/>
					<Button
						variant="text"
						left="cancel"
						on:click={() => {
							rejectRequest(key);
						}}
					/>
				</div>
			</div>
			<!-- <Text type=" title ">{friend.name}</Text>
			<Text type=" body ">{friend.pub}</Text> -->
		{/each}
	</div>
{:else}
	<div
		class="w-full h-full font-bold tracking-widest flex justify-center items-center"
	>
		<Text type=" body ">No activities...</Text>
	</div>
{/if}
