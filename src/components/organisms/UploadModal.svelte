<script>
	import Button from "$atoms/Button.svelte";
	import Modal from "$molecules/Modal.svelte";
	import Upload from "$molecules/Upload.svelte";
	// import { current } from "$lib/cloud.js";
	import { addToast } from "$lib/store.js";
	export let folder;
	let modal;
</script>

<Modal bind:this={modal}>
	<Button
		left="addFile"
		on:click={() => {
			// if ($current) {
			// addToast({
			// 	message: `Uploading in progress`,
			// 	type: "error",
			// 	dismissible: true,
			// 	timeout: 400,
			// });
			// return;
			// // }
			modal.show();
		}}
		variant="primary"
	/>
	<div class="px-2 py-2 flex justify-end" slot="header">
		<Button
			left="close"
			on:click={() => {
				modal.hide();
			}}
			variant="text"
		/>
	</div>
	<div slot="content">
		<Upload {folder} />
	</div>
</Modal>
