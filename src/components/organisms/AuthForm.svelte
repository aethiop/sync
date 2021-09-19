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
			placeholder: "Type your alias...",
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
			placeholder: "Enter/Paste your key/fingerprint",
			inputType: "text",
		},
	];

	let result = {};
</script>

{#if createSeen}
	<Form
		pos="center"
		icon="fire"
		submitValue="Create"
		onSubmit={({ username }) => {
			create(username);
			history.pushState("/home", "", "/home");
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
			history.pushState("/home", "", "/home");
		}}
		fields={loginFields}
	/>
{/if}
<div class="mt-10">
	<Button variant="text" on:click={() => (createSeen = !createSeen)}
		>{createSeen ? "Already have a galaxy?" : "Create one!"}</Button
	>
</div>
