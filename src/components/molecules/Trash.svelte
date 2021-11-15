<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";
	import Title from "$atoms/Title.svelte";
	import Text from "$atoms/Text.svelte";
	import Button from "$atoms/Button.svelte";
	import Modal from "$molecules/Modal.svelte";
	import { deleteFile } from "$lib/cloud.js";
	import { addToast } from "$lib/store.js";
	export let file;
	export let folder;
	export let title;
	export let message;
	export let cancel;
	const deleteCompleted = () => {
		addToast({
			message: `File has been deleted! Its been moved to trash folder.`,
			type: "error",
			dismissible: true,
			timeout: 700,
		});
	};
	let modal;
</script>

<Modal bind:this={modal}>
	<Button
		left="trash"
		variant="text-error"
		on:click={() => {
			modal.show();
		}}
	/>

	<div slot="header" class="px-4 ">
		<Text type=" text-lg font-extra ">
			{title}
		</Text>
	</div>
	<div slot="content" class="px-4 overflow-auto py-7">
		<Text type=" text-sm ">
			{message}
		</Text>
	</div>
	<div slot="footer" class="flex flex-row space-x-2 justify-end px-2 py-2 ">
		<Button variant="text" name={cancel} on:click={modal.hide()} />
		<Button
			variant="error"
			name={"Delete"}
			on:click={() => {
				deleteFile(folder, file);
				deleteCompleted();
			}}
		/>
	</div>
</Modal>
