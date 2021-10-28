<script>
	import Icon from "./Icon.svelte";
	import Text from "./Text.svelte";
	export let variant = "primary";
	export let left = "";
	export let right = "";
	export let full = false;
	export let name;
</script>

<!-- Button Atom -->
<button
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:focus
	on:disabled
	type="submit"
	class:btn-primary={variant == "primary"}
	class:py-3={variant == "primary" && !name}
	class:sm:py-4={variant == "primary" && !name}
	class:btn-gradient={variant == "gradient"}
	class:btn-secondary={variant == "secondary"}
	class:btn-error={variant == "error"}
	class:btn-text={variant == "text"}
	class:btn-text-error={variant == "text-error"}
	class:w-full={full}
	class:justify-center={!name && left}
	class="btn"
>
	{#if left}
		<Icon name={left} />
	{/if}
	{#if name}
		<span> <Text type="body" class="truncate ">{name}</Text></span>
	{/if}
	{#if right}
		<Icon name={right} />
	{/if}
</button>

<style>
</style>
