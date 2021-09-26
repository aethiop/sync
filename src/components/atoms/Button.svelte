<script>
	import Icon from "$atoms/Icon.svelte";
	export let variant = "primary";
	export let icon = "";
	export let full = false;
	export let name;
</script>

<button
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:focus
	type="submit"
	class:bg-transparent={variant == "text"}
	class:bg-primary={variant == "primary"}
	class:hover:border-primary={variant == "primary"}
	class:hover:border-error={variant == "error"}
	class:hover:border-secondary={variant == "secondary"}
	class:bg-error={variant == "error"}
	class:border-on-primary={variant == "disabled"}
	class:bg-secondary={variant == "secondary"}
	class:w-full={full}
	class:justify-start={name}
	class:justify-center={icon && !name}
	class="flex w-auto items-center  space-x-2  font-semibold  text-on-background rounded-xl hover:bg-background border-2 border-transparent   px-4 py-2 sm:px-4 sm:py-2 transition duration-100 ease-in-out  disabled:opacity-50 disabled:cursor-not-allowed"
>
	{#if icon}
		<Icon class="w-5 h-5 hover:fill-current" name={icon} />
	{/if}
	{#if name}
		<span>{name}</span>
	{/if}
</button>
