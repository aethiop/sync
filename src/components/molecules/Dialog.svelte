<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";
	import Title from "$atoms/Title.svelte";
	import Text from "$atoms/Text.svelte";
	import Button from "$atoms/Button.svelte";
	import Modal from "$molecules/Modal.svelte";
	let modal;
	export let title;
	export let message;
	export let cancel;
</script>

<Modal bind:this={modal}>
	<slot />
	<div slot="header" class="px-4 ">
		<Text type=" title ">
			{title}
		</Text>
	</div>
	<div slot="content" class="px-4 overflow-x-auto py-7">
		<Text type=" body ">
			{message}
		</Text>
	</div>
	<div
		slot="footer"
		let:store={{ close }}
		class="flex flex-row space-x-2 justify-end px-2 py-2 "
	>
		<Button variant="text" name={cancel} on:click={close} />
	</div>
</Modal>
