<script>
	// @ts-nocheck
	import Welcome from "$templates/Welcome.svelte";
	import Home from "$templates/Home.svelte";
	import { onMount } from "svelte";
	import { dark } from "$theme/theme";
	import { isAuthenticated } from "./lib/store";
	import { login } from "./lib/auth";

	onMount(() => {
		localStorage.getItem("key") &&
			login(JSON.parse(localStorage.getItem("key")));
	});
</script>

<div class={$dark ? "dark" : ""}>
	<div
		class=" w-full h-screen flex flex-col px-2  sm:mt-0 bg-background  items-center"
	>
		{#if !$isAuthenticated}
			<Welcome />
		{:else}
			<Home />
		{/if}
	</div>
</div>
