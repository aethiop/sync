<script>
	// @ts-nocheck

	import SubTitle from "$atoms/SubTitle.svelte";
	import Icon from "$atoms/Icon.svelte";
	import Logo from "$atoms/Logo.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	import ProfileMenu from "$organisms/ProfileMenu.svelte";
	import { isAuthenticated, profile } from "$lib/store";
	let value;
	import url from "$lib/url";
	function handleLinkClick(e) {
		e.preventDefault();
		const href = "e.target.name";
		console.log(href);
		history.pushState(href, "", href);
	}
</script>

{#if !$isAuthenticated}
	<div class="flex ml-auto pt-10  pr-2" />
{:else}
	<div class="flex flex-row items-center justify-between w-full pl-2 h-20">
		<div class="flex items-center space-x-4">
			<slot name="left" />
		</div>
		<div class="sm:w-1/3">
			<slot name="center" />
		</div>
		<div class="flex flex-row items-center space-x-4 pr-2">
			<slot name="right" />
		</div>
	</div>
{/if}
