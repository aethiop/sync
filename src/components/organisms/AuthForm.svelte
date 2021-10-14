<script>
	// @ts-nocheck

	import Form from "$molecules/Form.svelte";
	import Button from "$atoms/Button.svelte";
	import { login, create } from "$lib/auth.js";
	$: createSeen = true;
	let createFields = [
		{
			name: "username",
			id: "username",
			type: "text",
			value: "",
			placeholder: "Username",
			inputType: "text",
			inputIcon: "at",
		},
	];
	let loginFields = [
		{
			name: "key",
			id: "key",
			type: "text",
			value: "",
			inputIcon: "fingerprint",
			placeholder: "Paste your key...",
			inputType: "text",
		},
	];
</script>

<div class="w-full flex flex-col items-center">
	{#if createSeen}
		<Form
			pos="center"
			icon="fire"
			submitValue="Register"
			onSubmit={({ username }) => {
				create(username);
			}}
			fields={createFields}
		/>
	{:else}
		<Form
			pos="center"
			icon="login"
			submitValue="Login"
			onSubmit={({ key }) => {
				login(key);
			}}
			fields={loginFields}
		/>
	{/if}
	<div class="pt-2">
		<Button
			variant="text"
			on:click={() => (createSeen = !createSeen)}
			name={createSeen ? "Already have a galaxy?" : "Create one!"}
		/>
	</div>
</div>
