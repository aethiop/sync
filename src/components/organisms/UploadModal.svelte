<script>
	import Button from "$atoms/Button.svelte";
	import Modal from "$molecules/Modal.svelte";
	import Upload from "$molecules/Upload.svelte";
	export let folder;
</script>

<Modal>
	<div slot="trigger" let:open>
		<div class={$$props.class + " lg:absolute lg:bottom-4 lg:right-4"}>
			<Button left="addFile" on:click={open} variant="primary" />
		</div>
	</div>

	<div slot="content">
		<Upload {folder} let:close />
	</div>
</Modal>
