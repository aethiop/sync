<script>
	import Icon from "$atoms/Icon.svelte";
	import Text from "$atoms/Text.svelte";
	export let variant = "primary";
	export let icon = "";
	export let full = false;
	export let name;
	let button;
</script>

<!-- Button Atom -->
<button
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:focus
	bind:this={button}
	type="submit"
	class:btn-primary={variant == "primary"}
	class:btn-text={variant == "text"}
	class:btn-text-error={variant == "text-error"}
	class:btn-secondary={variant == "secondary"}
	class:btn-error={variant == "error"}
	class:border-on-primary={variant == "disabled"}
	class:w-full={full}
	class:justify-start={name}
	class:justify-center={icon && !name}
	class={"btn"}
>
	{#if icon}
		<Icon name={icon} />
	{/if}
	{#if name}
		<span> <Text class="truncate">{name}</Text></span>
	{/if}
</button>

<style>
	/* hover:bg-opacity-75 */
	.btn {
		@apply flex  items-center   font-semibold rounded-xl border-transparent py-2 transition duration-100 ease-in-out;
	}
	.btn-primary {
		@apply bg-primary space-x-2 px-4 text-on-primary;
	}

	/* hover:bg-opacity-75 */
	.btn-secondary {
		@apply bg-secondary space-x-2 px-4 text-on-primary;
	}

	/* hover:bg-opacity-75 */
	.btn-error {
		@apply bg-error;
	}
	/* hover:text-primary */
	.btn-text {
		@apply px-2 text-on-background;
	}

	/* hover:text-secondary */
	.btn-text-error {
		@apply text-error;
	}
</style>
