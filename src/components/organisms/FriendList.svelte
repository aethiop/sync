<script>
	// @ts-nocheck
	import Text from "$atoms/Text.svelte";
	import DownloadFile from "$molecules/DownloadFile.svelte";
	import TrashFile from "$molecules/TrashFile.svelte";
	import { files } from "$lib/store.js";
	import { onMount } from "svelte";
	import { getRequests } from "$lib/friend.js";

	$: friends = [];
	onMount(() => {
		// friends = getRequests();
	});
</script>

{#if friends.length > 0}
	<div
		class="flex overflow-hidden w-full p-2 items-center flex-col space-y-4"
	/>
{:else}
	<div
		class="w-full h-full font-bold tracking-widest flex justify-center items-center"
	>
		<Text type=" body ">No friends around...[Coming Soon].</Text>
	</div>
{/if}
