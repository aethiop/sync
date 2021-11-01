<script>
	import Welcome from "$templates/pages/Welcome.svelte";
	import Home from "$templates/pages/Home.svelte";
	import Settings from "$templates/pages/Settings.svelte";
	import Toast from "$atoms/Toast.svelte";
	import { onMount } from "svelte";
	import { dismissToast, toasts, isAuthenticated } from "$lib/store";
	// @ts-ignore
	import { login } from "$lib/auth.js";
	import ThemeContext from "$atoms/ThemeContext.svelte";

	import url from "$lib/url";
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
		{:else if $url.hash === "" || $url.hash === "#/"}
			<Home />
		{:else if $url.hash === "#/settings"}
			<Settings />
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
