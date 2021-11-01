<script>
	// @ts-nocheck

	import TextInput from "$atoms/TextInput.svelte";
	import Public from "$organisms/Public.svelte";
	import Friends from "$templates/pages/Friends.svelte";
	import Trash from "$templates/pages/Trash.svelte";
	import SettingsTabs from "$organisms/SettingsTabs.svelte";
	import Notifications from "$templates/pages/Notifications.svelte";
	import Cloud from "$templates/pages/Cloud.svelte";

	import HomeHeader from "$organisms/HomeHeader.svelte";

	let items = [
		{
			name: "General",
			icon: "cloud",
			value: 1,
			component: Cloud,
		},
		{
			name: "Appearance",
			icon: "notification",
			value: 2,
			component: Notifications,
		},

		{
			name: "Privacy & Security",
			icon: "friends",
			value: 3,
			component: Friends,
		},
		{
			name: "Feedback",
			icon: "trash",
			value: 4,
			component: Trash,
		},
		{
			name: "About Sync",
			icon: "trash",
			value: 5,
			component: Trash,
		},
	];
</script>

<div class="w-full sm:w-full h-screen flex flex-row">
	<SettingsTabs {items} />
</div>
