<script>
	// @ts-nocheck
	import { tweened } from "svelte/motion";
	import Icon from "$atoms/Icon.svelte";
	import File from "$atoms/File.svelte";
	import Button from "$atoms/Button.svelte";
	import Progress from "$atoms/Progress.svelte";
	// import TextButton from "$atoms/Button/TextButton.svelte";
	import { createEventDispatcher } from "svelte";
	import { user } from "$lib/db.js";

	$: file = null;
	let files = {};
	let reader = {};
	let progress = tweened(0);
	let loading = true;
	var slice_size = 1024 * 1024;
	$: {
		if (files[0]) file = files[0];
	}

	const is_file = () => {
		if (files && files[0] && files[0].size > 0) {
			return true;
		}
		return false;
	};
	let prev = user.get("file");

	function upload() {
		if (is_file()) {
			reader = new FileReader();
			prev = user.get("file").get(file.name).get("next");
			upload_file(0);
		}
	}

	function splitAndUpload(start, b64) {
		var next_slice = start + slice_size + 1;
		var b64String = b64.slice(start, next_slice);
		if (next_slice <= b64.length) {
			$progress = Math.floor(((start + slice_size) / b64.length) * 100);
			prev.put({ data: b64String });
			prev = prev.get("next");
			splitAndUpload(next_slice, b64);
		} else {
			$progress = 100;
			loading = false;
		}
	}

	let d = "";
	function upload_file(start) {
		var blob = file;
		// var blob = file;
		reader.onloadend = function (e) {
			splitAndUpload(start, e.target.result);
		};
		reader.readAsDataURL(blob);
	}
</script>

{#if file}
	<div class="">
		<div class="py-2 px-4">
			<Progress {progress} />
		</div>
		<div class="py-4">
			<File name={file.name} size={file.size} />
		</div>
	</div>
{:else}
	<div
		class="border-2 border-transparent hover:border-on-background bg-surface w-full border-dashed rounded-lg relative "
	>
		<input
			bind:files
			type="file"
			class="cursor-pointer relative block opacity-0 w-full h-full p-28 z-10"
		/>
		<Icon
			class="w-10 h-10 text-on-background hover:text-on-primary absolute mt-7 top-9 mx-auto left-0 right-0"
			name="inbox"
			fill={false}
		/>
		<h4
			class="text-on-background mt-7 font-semibold tracking-widest text-center p-16 absolute top-5 right-0 left-0 m-auto"
		>
			Drop files anywhere to upload<br /> or <br />Select Files
		</h4>
	</div>
{/if}

<div class="flex justify-end pt-3">
	{#if file}
		<Button on:click={upload} variant="primary" name="Upload" />
	{:else if loading}
		<Button variant="disabled" name="Upload" />
	{/if}
</div>
