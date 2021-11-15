<script>
	import { slide } from "svelte/transition";

	import Icon from "$atoms/Icon.svelte";
	import Text from "$atoms/Text.svelte";
	export let active;
	export let icon;
	export let name;
	$: activeClass = active ? "bg-primary/25 text-primary" : "";
</script>

<div
	class={activeClass +
		" flex justify-start transition-transform ease-out w-full text-on-background cursor-pointer space-x-4 rounded-lg p-3 sm:px-2 sm:py-2  flex-row items-center"}
>
	<Icon class="pt-0" name={icon} fill={active} />
	<span transition:slide class={"hidden transition-all lg:block pr-2 "}>
		<Text type="body">{name}</Text>
	</span>
	<!-- <p class=" sm:block w-full pr-2">{name}</p> -->
</div>
