<script>
	// @ts-nocheck
	import Avatar from "$atoms/Avatar.svelte";
	import Menu from "$molecules/Menu.svelte";
	import { logout } from "$lib/auth.js";
	import { dark } from "$theme/theme.js";
	import Button from "$atoms/Button.svelte";
	export let name;
</script>

<div>
	<Menu>
		<Avatar slot="button" {name} />
		<Button
			full={true}
			variant="text"
			icon="user"
			name="Profile Settings"
		/>
		<Button
			full={true}
			variant="text"
			icon="settings"
			name="General Settings"
		/>
		<Button
			full={true}
			variant="text"
			on:click={() => ($dark = !$dark)}
			icon={$dark ? "sun" : "moon"}
			name={$dark ? "Light Mode" : "Dark Mode"}
		/>
		<Button
			full={true}
			variant="text"
			on:click={logout}
			icon="logout"
			name="Logout"
		/>
	</Menu>
</div>
