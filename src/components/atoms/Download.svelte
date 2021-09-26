<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";
	import { tweened } from "svelte/motion";
	import Button from "$atoms/Button.svelte";
	import Link from "$atoms/Link.svelte";
	import { user } from "$lib/db.js";
	export let name;
	let downloading = false;
	let data = null;
	async function getChunks(k) {
		let chunks = "";
		var next = user.get("file").get(k);
		while ((await next.get("next").get("data")) != null) {
			downloading = true;
			next = next.get("next");
			chunks += await next.get("data");
		}
		data = chunks + "";
	}
</script>

<div
	class="flex flex-row w-full items-center space-x-4 mx-2 px-4 py-2 shadow-md bg-surface  rounded-xl"
>
	<div>
		<Icon class="w-7 h-7 text-on-background" name="document" />
	</div>
	<div class="w-full text-on-background truncate">
		{name}
	</div>
	{#if !data}
		{#if downloading}
			<div class="py-2 px-2">
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
			</div>
		{:else}
			<div class="py-2 px-2">
				<Icon
					class="w-5 h-5 cursor-pointer focus:outline-none  "
					name="loading"
					on:click={() => getChunks(name)}
				/>
			</div>
		{/if}
	{:else}
		<a class="focus:outline-none py-2 px-2" href={data} download={name}
			><Icon class="w-5 h-5" name="download" /></a
		>
	{/if}
</div>
