<script>
	import Icon from "$atoms/Icon.svelte";
	import Text from "$atoms/Text.svelte";
	export let variant = "primary";
	export let icon = "";
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
	type="submit"
	class:bg-transparent={variant == "text"}
	class:text-on-background={variant == "text"}
	class:bg-primary={variant == "primary"}
	class:text-on-primary={variant == "primary"}
	class:hover:text-primary={variant == "text"}
	class:text-error={variant == "text-error"}
	class:hover:text-secondary={variant == "text-error"}
	class:hover:bg-opacity-75={variant == "primary" || "error"}
	class:hover:border-secondary={variant == "secondary"}
	class:bg-error={variant == "error"}
	class:border-on-primary={variant == "disabled"}
	class:bg-secondary={variant == "secondary"}
	class:w-full={full}
	class:justify-start={name}
	class:justify-center={icon && !name}
	class={" flex w-auto items-center space-x-2 px-4  font-semibold rounded-xl border-transparent  py-1.5   transition duration-100 ease-in-out disabled:bg-opacity-50 disabled:cursor-not-allowed"}
>
	{#if icon}
		<Icon name={icon} />
	{/if}
	{#if name}
		<span> <Text class="truncate ">{name}</Text></span>
	{/if}
</button>
