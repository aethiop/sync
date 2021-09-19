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
		<Button full={true} variant="text" icon="user">Profile Settings</Button>
		<Button full={true} variant="text" icon="settings"
			>General Settings</Button
		>
		<Button
			full={true}
			variant="text"
			on:click={() => ($dark = !$dark)}
			icon={$dark ? "sun" : "moon"}
			>{$dark ? "Light Mode" : "Dark Mode"}
		</Button>
		<Button full={true} variant="text" on:click={logout} icon="logout"
			>Logout</Button
		>
	</Menu>
</div>
