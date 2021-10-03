<script>
	// @ts-nocheck

	import SubTitle from "$atoms/SubTitle.svelte";
	import Icon from "$atoms/Icon.svelte";
	import Logo from "$atoms/Logo.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	import ProfileMenu from "$organisms/ProfileMenu.svelte";
	import { isAuthenticated, profile } from "$lib/store";
	let value;
</script>

{#if !$isAuthenticated}
	<div class="flex ml-auto pt-10  pr-2" />
{:else}
	<div class="flex flex-row items-center justify-between w-full  pl-2 h-20">
		<div class="flex items-center space-x-4">
			<Logo class="w-16 h-16" />
			<SubTitle class="hidden sm:block">Galactic</SubTitle>
		</div>
		<div class="sm:w-1/3">
			<TextInput
				placeholder="Search..."
				name="Search"
				icon="search"
				bind:value
			/>
		</div>
		<div class="flex flex-row items-center space-x-4 pr-2">
			<div class="flex flex-row space-x-5 items-center ">
				<Icon class="text-on-background w-5 h-5" name="notification" />

				<ProfileMenu profile={$profile} />
			</div>
		</div>
	</div>
{/if}
