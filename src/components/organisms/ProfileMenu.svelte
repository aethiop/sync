<script>
	// @ts-nocheck
	import Avatar from "$atoms/Avatar.svelte";
	import Menu from "$molecules/Menu.svelte";
	import { logout } from "$lib/auth.js";
	import { getContext } from "svelte";
	const { theme, toggle } = getContext("theme");
	import Button from "$atoms/Button.svelte";
	import Text from "$atoms/Text.svelte";
	export let profile;
	$: console.log($theme);
</script>

<div>
	<Menu>
		<div
			class="flex flex-row items-center space-x-2 bg-background p-2 hover:shadow-lg rounded-xl hover:bg-surface"
			slot="button"
		>
			<Avatar name={profile.username} />
			<div class="hidden sm:flex ">
				<Text>{profile.username}</Text>
			</div>
		</div>
		<Button
			class="hover:bg-background"
			full={true}
			variant="text"
			icon="settings"
			name="Settings"
		/>
		<Button
			class="hover:bg-background"
			full={true}
			variant="text"
			on:click={toggle}
			icon={$theme.name != "light" ? "sun" : "moon"}
			name={$theme.name != "light" ? "Light Mode" : "Dark Mode"}
		/>
		<Button
			class="hover:bg-background"
			full={true}
			variant="text"
			icon="question"
			name="Help & About"
		/>
		<Button
			class="hover:bg-background"
			full={true}
			variant="text"
			on:click={logout}
			icon="logout"
			name="Logout"
		/>
	</Menu>
</div>
