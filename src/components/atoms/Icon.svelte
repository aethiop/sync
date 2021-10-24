<script>
	// @ts-nocheck

	import { icons } from "../../theme/icons.js";
	export let name;
	export let sizeString = "w-5 h-5";
	export let fill = false;
</script>

<!-- Icon Atom -->
<div class={$$props.class}>
	<svg
		on:click
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:focus
		xmlns="http://www.w3.org/2000/svg"
		class={sizeString + " outline-none "}
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
</div>
