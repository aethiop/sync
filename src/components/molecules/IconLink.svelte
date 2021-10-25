<script>
	import Icon from "$atoms/Icon.svelte";
	import Text from "$atoms/Text.svelte";
	export let active;
	export let icon;
	export let name;
	$: activeClass = active ? "bg-primary/25 text-primary" : "";
</script>

<div
	class={activeClass +
		" flex justify-start transition-transform ease-out w-full text-on-background cursor-pointer space-x-4 rounded-lg px-2 py-2 sm:px-4 sm:py-1    flex-row items-center"}
>
	<Icon name={icon} fill={active} />
	<span class="hidden lg:block pr-2 ">
		<Text type="body">{name}</Text>
	</span>
	<!-- <p class=" sm:block w-full pr-2">{name}</p> -->
</div>
