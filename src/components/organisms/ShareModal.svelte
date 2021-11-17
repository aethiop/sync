<script>
	import Button from "$atoms/Button.svelte";
	import Text from "$atoms/Text.svelte";
	import Modal from "$molecules/Modal.svelte";
	import Form from "$molecules/Form.svelte";
	import FriendList from "$organisms/FriendList.svelte";
	// import { sendRequest } from "$lib/friend.js";
	let addFreind = [
		{
			name: "pub",
			id: "pub",
			type: "text",
			value: "",
			placeholder: "Your Friend's Address",
			inputType: "text",
			inputIcon: "at",
		},
	];
	let modal;
	export let title;
	export let folder;
</script>

<Modal bind:this={modal}>
	<Button
		left="share"
		variant="text-secondary"
		on:click={() => {
			modal.show();
		}}
	/>
	<div
		class="flex flex-row justify-between items-center px-2 py-2"
		slot="header"
	>
		<Text type=" title ">Share {title} with:</Text>
		<Button
			left="close"
			on:click={() => {
				modal.hide();
			}}
			variant="text"
		/>
	</div>
	<div
		slot="footer"
		class="w-full flex flex-col items-center  justify-center"
	>
		<FriendList {folder} file={title} share={true} />
	</div>
</Modal>
