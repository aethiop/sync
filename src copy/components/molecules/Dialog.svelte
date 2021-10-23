<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";
	import Title from "$atoms/Title.svelte";
	import Text from "$atoms/Text.svelte";
	import Button from "$atoms/Button.svelte";
	import Modal from "$molecules/Modal.svelte";

	export let title;
	export let message;
	export let cancel;
</script>

<Modal>
	<div slot="trigger" let:open>
		<Icon class="cursor-pointer" on:click={open} name="trash" />
	</div>
	<div slot="header" class="px-4 ">
		<Title>{title}</Title>
	</div>
	<div slot="content" class="px-4 overflow-x-auto py-7">
		<Text>
			{message}
		</Text>
	</div>
	<div
		slot="footer"
		let:store={{ close }}
		class="flex flex-row justify-end px-2 py-2 "
	>
		<Button variant="text" name={cancel} on:click={close} />
		<slot />
	</div>
</Modal>
