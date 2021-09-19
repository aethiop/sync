<script>
	// @ts-nocheck

	import { icons } from "$theme/icons.js";
	export let name;
	export let fill = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={$$props.class + "  "}
	viewBox="0 0 24 24"
	fill={fill ? "currentColor" : "none"}
	stroke="currentColor"
>
	{#each icons[name] as d}
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			{d}
		/>
	{/each}
</svg>
