<script>
	// @ts-nocheck

	import Heading from "$atoms/Heading.svelte";
	import LogoTitle from "$molecules/LogoTitle.svelte";
	import ProfileMenu from "$organisms/ProfileMenu.svelte";
	import { isAuthenticated, profile } from "$lib/store";
</script>

{#if !$isAuthenticated}
	<div class="flex ml-auto pt-10 sm:pt-2 pr-2" />
{:else}
	<div
		class="flex flex-row items-center justify-between w-full pt-10 sm:pt-2 pl-2 h-20"
	>
		<LogoTitle />
		<div class="flex flex-row items-center space-x-4 pr-2">
			<div
				class="flex flex-row items-center space-x-4 px-2 py-2 rounded-lg"
			>
				<div class="hidden sm:flex ">
					<Heading>{$profile.username}</Heading>
				</div>
				<ProfileMenu name={$profile.username} />
			</div>
		</div>
	</div>
{/if}
