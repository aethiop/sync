<script>
	// @ts-nocheck

	import Avatar from "$atoms/Avatar.svelte";
	import ProfileCard from "$molecules/ProfileCard.svelte";
	import ProfileMenu from "$organisms/ProfileMenu.svelte";
	import SubTitle from "$atoms/SubTitle.svelte";
	import { profile } from "$lib/store";
</script>

<div class="flex flex-row space-x-2 justify-center w-full items-center ">
	<ProfileCard profile={$profile} />
	<ProfileMenu />
</div>
