<script>
	// @ts-nocheck
	import Form from "$molecules/Form.svelte";
	import Text from "$atoms/Text.svelte";
	import Button from "$atoms/Button.svelte";
	let addFreind = [
		{
			name: "pubKey",
			id: "pubKey",
			type: "text",
			value: "",
			placeholder: "Enter your friends public key",
			inputType: "text",
			inputIcon: "at",
		},
	];
</script>

<div class="w-full">
	<Text type=" title ">Add Friend</Text>
	<Form
		pos="center"
		icon="fire"
		submitValue="Register"
		onSubmit={({ username }) => {
			// create(username);
		}}
		fields={addFreind}
	/>
</div>
