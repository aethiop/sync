<script>
	// @ts-nocheck

	import Title from "$atoms/Title.svelte";
	import Header from "$organisms/Header.svelte";
	import Heading from "$atoms/Heading.svelte";
	import Upload from "$molecules/Upload.svelte";
	import Icon from "$atoms/Icon.svelte";

	import { onMount } from "svelte";
	import { gun, user } from "$lib/db.js";
	import Button from "../atoms/Button.svelte";
	import Download from "../atoms/Download.svelte";

	let modal = false;
	$: files = [];

	onMount(async () => {
		user.get("file")
			.map()
			.once(async (d, k) => {
				files = [...files, k];
			});
	});
</script>

<div class="w-full sm:w-full h-screen flex flex-col">
	<Header />
	<div class="w-full h-full flex items-center text-on-background flex-col">
		<Title>Files</Title>
		<div class="w-1/2 pt-4 flex items-center space-x-2 flex-row">
			<Icon class="w-5 h-5" name="home" fill={true} />
			<h1 class="font-bold tracking-widest text-on-background">Home</h1>
		</div>
		{#if files.length > 0}
			<div class="flex w-1/2 pt-5 items-center flex-col space-y-4">
				{#each files as filename}
					<Download name={filename} />
				{/each}
			</div>
		{:else}
			<div
				class="w-full h-full font-bold tracking-widest flex justify-center items-center"
			>
				<h1>No Files Yet</h1>
			</div>
		{/if}
	</div>
	{#if modal}
		<div
			class="absolute flex w-full h-full backdrop-filter  backdrop-blur-lg justify-center items-center inset-0"
		>
			<div
				class="bg-surface w-1/2 px-2 py-2 rounded-2xl text-on-background font-bold"
			>
				<Upload />
			</div>
		</div>
	{/if}
	<div class="z-20 py-4 px-2 self-end">
		<Button
			icon={modal ? "close" : "addFile"}
			variant={modal ? "error" : "primary"}
			name={modal ? "Close" : "Add File"}
			on:click={() => {
				modal = !modal;
			}}
		/>
	</div>
</div>
