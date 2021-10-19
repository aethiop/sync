<script>
	import Icon from "$atoms/Icon.svelte";
	import Text from "$atoms/Text.svelte";

	export let active;
	export let icon;
	export let name;
</script>

<div
	class:bg-background={active}
	class="flex flex-row justify-center w-full cursor-pointer space-x-4 rounded-lg px-2 py-2 sm:px-4 sm:py-1  hover:text-primary  sm:flex-row items-center"
>
	<Icon name={icon} fill={active} />
	<p class:hidden={!active} class="pr-2 sm:block w-full transition-all">
		{name}
	</p>
</div>
