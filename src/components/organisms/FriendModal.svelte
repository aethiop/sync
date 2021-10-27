<script>
	import Button from "$atoms/Button.svelte";
	import Text from "$atoms/Text.svelte";
	import Modal from "$molecules/Modal.svelte";
	import Form from "$molecules/Form.svelte";
	import { sendRequest } from "$lib/friend.js";
	let addFreind = [
		{
			name: "pub",
			id: "pub",
			type: "text",
			value: "",
			placeholder: "Enter your friends public key",
			inputType: "text",
			inputIcon: "at",
		},
	];
</script>

<Modal>
	<div slot="trigger" let:open>
		<div class={$$props.class + "z-50 lg:absolute lg:bottom-4 lg:right-4"}>
			<Button left="addFriend" on:click={open} variant="primary" />
		</div>
	</div>
	<div
		slot="content"
		class="w-full flex flex-col items-center  justify-center"
	>
		<Text type=" title pb-4 ">Add Friend</Text>
		<Form
			pos="center"
			icon="addFriend"
			submitValue="Add Friend"
			onSubmit={({ pub }) => {
				// create(username);
				sendRequest(pub);
			}}
			fields={addFreind}
		/>
	</div>
</Modal>
