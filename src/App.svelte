<script>
	// @ts-nocheck
	import Welcome from "$templates/Welcome.svelte";
	import Home from "$templates/Home.svelte";
	import { onMount } from "svelte";
	import { isAuthenticated } from "./lib/store";
	import { user } from "./lib/db";
	import { login } from "./lib/auth";
	import ThemeContext from "$atoms/ThemeContext.svelte";
	let themeName;
	onMount(async () => {
		localStorage.getItem("key") &&
			login(JSON.parse(localStorage.getItem("key")));
	});
</script>

<ThemeContext>
	<div
		class=" w-full h-screen flex flex-col px-2  sm:mt-0 bg-background  items-center"
	>
		{#if !$isAuthenticated}
			<Welcome />
		{:else}
			<Home />
		{/if}
	</div>
</ThemeContext>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap");

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	:root {
		font-family: "Dosis", sans-serif;
	}
</style>
