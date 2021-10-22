<script>
	import TextInput from "$atoms/TextInput.svelte";
	import Button from "$atoms/Button.svelte";

	export let pos;

	export let submitValue;
	export let onSubmit;
	export let fields;
	export let icon;

	// Convert fields from [ { name: 'name', value: 'Value' } ] to { name : Value } which is more useful when submitting a form
	const fieldsToObject = (fields) =>
		fields.reduce((p, c) => ({ ...p, [c.name]: c.value }), {});

	// When submitting, turn our fields representation into a JSON body
	const handleSubmit = () => onSubmit(fieldsToObject(fields));
</script>

<form
	class="w-full sm:w-1/2 space-y-2"
	on:submit|preventDefault={() =>
		handleSubmit(
			// @ts-ignore
			fields
		)}
>
	{#each fields as field}
		<TextInput
			bind:value={field.value}
			placeholder={field.placeholder}
			name={field.name}
			icon={field.inputIcon}
		/>
	{/each}
	<div class={`flex flex-col pt-4 items-${pos}`}>
		<Button left={icon} variant="primary" name={submitValue} />
	</div>
</form>
