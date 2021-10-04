<script>
	// @ts-nocheck
	import { tweened } from "svelte/motion";
	import Icon from "$atoms/Icon.svelte";
	import SubTitle from "$atoms/SubTitle.svelte";
	import File from "$atoms/File.svelte";
	import Text from "$atoms/Text.svelte";
	import Button from "$atoms/Button.svelte";
	import Progress from "$atoms/Progress.svelte";
	import { uploadFile, fetchFiles, progress } from "$lib/cloud.js";
	import { addToast } from "$lib/store";

	export let folder;

	$: file = null;
	let files = {};
	$: {
		if (files[0]) file = files[0];
	}

	function upload() {
		uploadFile(folder, file);
		fetchFiles(folder);
		addToast({
			message: `File has been uploaded`,
			type: "success",
			dismissible: true,
			timeout: 3000,
		});
	}
</script>

{#if file}
	<div class="pb-4">
		<div class="px-5 py-2">
			<SubTitle
				>{$progress != 100
					? "Finish Uploading"
					: "Successfully Uploaded"}</SubTitle
			>
		</div>
		<div class="py-2 px-4">
			<Progress {progress} />
		</div>
		<div>
			<File name={file.name} type={file.type.split("/")[0]} />
		</div>
	</div>
{:else}
	<div
		class="border-2 border-transparent hover:shadow-lg  hover:border-on-background bg-surface w-full border-dashed  rounded-lg relative "
	>
		<input
			bind:files
			type="file"
			class="cursor-pointer relative block opacity-0 w-full h-full px-10 py-20 z-10"
		/>
		<div
			class="absolute left-0 right-0 top-14 space-y-4 flex flex-col justify-center items-center"
		>
			<Icon
				class="w-10 h-10 text-on-background hover:text-on-primary"
				name="inbox"
				fill={false}
			/>
			<Text>Drop files anywhere to upload. 👍</Text>
		</div>
	</div>
{/if}

{#if file}
	<div class="flex flex-row justify-end space-x-2">
		<Button
			on:click={() => {
				files = {};
				file = null;
				$progress = 0;
			}}
			icon="refresh"
			variant="text"
			name="Reset"
		/>
		<Button
			on:click={upload}
			icon="upload"
			variant="primary"
			name="Upload"
		/>
	</div>
{/if}
