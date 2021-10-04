<script>
	// @ts-nocheck
	import Welcome from "$templates/Welcome.svelte";
	import Home from "$templates/Home.svelte";
	import Toast from "$atoms/Toast.svelte";
	import { onMount } from "svelte";
	import { dismissToast, toasts, isAuthenticated } from "./lib/store";
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

		{#if $toasts}
			<div
				class="absolute flex flex-col space-y-2 lg:pb-4 bottom-0 pb-20"
			>
				{#each $toasts as toast (toast.id)}
					<Toast
						type={toast.type}
						dismissible={toast.dismissible}
						on:dismiss={() => dismissToast(toast.id)}
						>{toast.message}</Toast
					>
				{/each}
			</div>
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
