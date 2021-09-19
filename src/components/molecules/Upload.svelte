<script>
	// @ts-nocheck
	import { tweened } from "svelte/motion";
	import Icon from "$atoms/Icon.svelte";
	import File from "$atoms/File.svelte";
	import Button from "$atoms/Button.svelte";
	// import TextButton from "$atoms/Button/TextButton.svelte";
	import { createEventDispatcher } from "svelte";
	import { user } from "$lib/db.js";

	$: file = null;
	let files = {};
	let reader = {};
	let percent = tweened(0);
	let loading = true;
	const is_file = () => {
		if (files && files[0] && files[0].size > 0) {
			return true;
		}
		return false;
	};

	function blobToDataURL(blob, callback) {
		var a = new FileReader();
		a.onload = function (e) {
			callback(e.target.result);
		};
		a.readAsDataURL(blob);
	}
	$: {
		if (is_file()) {
			file = files[0];
			console.log(file.name);
		}
	}

	function upload() {
		if (is_file()) {
			reader = new FileReader();
			upload_file(0);
		}
	}

	async function upload_file(start) {
		var slice_size =
			file.size && file.size > 1000 * 1024 ? 1000 * 1024 : file.size - 1;

		var next_slice = start + slice_size + 1;
		var blob = file.slice(start, next_slice);
		var size_done = start + slice_size;

		reader.onloadend = async function (event) {
			if (event.target.readyState !== FileReader.DONE) {
				return;
			}

			if (next_slice <= file.size) {
				blobToDataURL(blob, async (url) => {
					user.get("files")
						.get(file.name)
						.get(start)
						.put(url, (ack) => {
							if (ack.ok) loading = false;
						});
				});
				upload_file(next_slice);
			} else {
				console.log("Finished uploading");
			}
			$percent = Math.floor(size_done / file.size) * 100;
		};
		reader.readAsDataURL(blob);
	}
</script>

{#if file}
	<div class="">
		<div class="py-2 px-4">
			{#if $percent != 100}
				<div class="flex flex-row items-center space-x-4 px-2">
					<div
						class="h-3 relative w-full rounded-full overflow-hidden"
					>
						<div class="w-full h-full bg-background absolute" />
						<div
							style={"width: " + $percent + "%"}
							id="bar"
							class="h-full bg-primary relative w-0 rounded-2xl"
						/>
					</div>
					<span class="min-w-max">{$percent.toFixed(0)} %</span>
				</div>
			{:else}
				{#key loading}
					<div
						class="flex flex-row justify-center items-center space-x-5 px-3"
					>
						<Icon
							class={loading
								? "w-5 h-5 animate-bounce"
								: "w-5 h-5"}
							name={loading ? "uploading" : "check"}
						/>
						<span class="font-bold tracking-wide"
							>{loading
								? "Syncing to peers..."
								: "Finished Uploading"}</span
						>
					</div>
				{/key}
			{/if}
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
		<Button on:click={upload} variant="primary">Upload</Button>
	{:else if loading}
		<Button variant="disabled">Upload</Button>
	{/if}
</div>
