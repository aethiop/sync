<script>
	// @ts-nocheck

	import Logo from "$atoms/Logo.svelte";
	import SubTitle from "$atoms/SubTitle.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	import Icon from "$atoms/Icon.svelte";
	import Header from "$molecules/Header.svelte";
	import ProfileMenu from "$organisms/ProfileMenu.svelte";
	import { profile } from "$lib/store";
	let value;
</script>

<Header>
	<div class="flex flex-row space-x-2 items-center" slot="left">
		<Logo class="w-16 h-16" />
		<SubTitle class="hidden sm:block">Sync</SubTitle>
	</div>
	<div slot="center">
		<TextInput
			placeholder="Search..."
			name="Search"
			icon="search"
			bind:value
		/>
	</div>
	<div class="flex flex-row space-x-5 items-center " slot="right">
		<ProfileMenu profile={$profile} />
	</div>
</Header>
