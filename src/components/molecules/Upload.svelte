<script>
	// @ts-nocheck
	import { tweened } from "svelte/motion";
	import { onMount } from "svelte";
	import Icon from "$atoms/Icon.svelte";
	import SubTitle from "$atoms/SubTitle.svelte";
	import File from "$atoms/File.svelte";
	import Text from "$atoms/Text.svelte";
	import Button from "$atoms/Button.svelte";
	import Progress from "$atoms/Progress.svelte";
	import { uploadFile, fetchFiles, uploading } from "$lib/cloud.js";
	import { addToast } from "$lib/store";
	export let folder;
	$: file = null;
	let files = {};
	$: {
		if (files[0]) file = files[0];
	}
	onMount(() => {
		$uploading = 0;
		files = {};
	});
	let options = [
		{ name: "gun", func: uploadtoGun },
		{ name: "torrent", fun: uploadtoTorrent },
	];
	let selected = options[0];

	function uploadtoTorrent() {
		console.log("Torrent");
	}

	function uploadtoGun() {
		if (!($uploading > 0 && $uploading < 100)) {
			uploadFile(folder, file);
			fetchFiles(folder);
			addToast({
				message: `File has been uploaded`,
				type: "success",
				dismissible: true,
				timeout: 3000,
			});
		}
	}
</script>

{#if file}
	<div class="pb-4">
		<div class="px-5 py-2">
			<Text type="h3"
				>{$uploading != 100
					? "Finish Uploading"
					: "Successfully Uploaded"}</Text
			>
		</div>
		<div class="py-2 px-4">
			<Progress progress={$uploading} />
		</div>
		<div>
			<File name={file.name} type={file.type.split("/")[0]} />
		</div>
	</div>
{:else}
	<div
		class="border-2 border-transparent hover:border-on-background hover:bg-background/40 sm:w-full border-dashed  rounded-lg relative "
	>
		<input bind:files type="file" class="upload-input" />
		<div class="upload-info">
			<Icon
				sizeString="w-7 h-7"
				class=" text-primary/75 "
				name="inbox"
				fill={false}
			/>
			<div class="hidden sm:block">
				<Text class="" type="body"
					>Drop files anywhere to upload. 👍</Text
				>
			</div>
		</div>
	</div>
{/if}

{#if file}
	<div class="flex flex-row justify-end space-x-2">
		{#key $uploading}
			{#if $uploading != 100}
				<Button
					on:click={() => {
						files = {};
						file = null;
						$uploading = 0;
					}}
					left="refresh"
					variant="text"
					name="Reset"
				/>

				<Button
					on:click={selected.func}
					left="upload"
					variant="primary"
					name="Upload"
				/>
			{/if}{/key}
	</div>
{/if}
