<script>
	// @ts-nocheck
	import Welcome from "$templates/Welcome.svelte";
	import Home from "$templates/Home.svelte";
	import Toast from "$atoms/Toast.svelte";
	import { onMount } from "svelte";
	import { dismissToast, toasts, isAuthenticated } from "./lib/store";
	import { login } from "./lib/auth";
	import ThemeContext from "$atoms/ThemeContext.svelte";
	import url from "./lib/url";
	let themeName;
	onMount(async () => {
		localStorage.getItem("key") &&
			login(JSON.parse(localStorage.getItem("key")));
	});
</script>

<ThemeContext>
	<div class=" w-full h-screen flex flex-col bg-background  items-center">
		{#if !$isAuthenticated}
			<Welcome />
		{:else}
			<Home />
		{/if}

		{#if $toasts}
			<div
				class="visible mx-2 absolute flex flex-col space-y-2 lg:pb-4 bottom-0 pb-24 "
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
</style>
