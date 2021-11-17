<script>
	// @ts-nocheck

	import TextInput from "$atoms/TextInput.svelte";
	import Public from "$organisms/Public.svelte";
	// import Shared from "$templates/pages/Shared.svelte";
	import Trash from "$templates/pages/Trash.svelte";
	import SettingsTabs from "$organisms/SettingsTabs.svelte";
	import Notifications from "$templates/pages/Notifications.svelte";
	import Cloud from "$templates/pages/Cloud.svelte";

	import HomeHeader from "$organisms/HomeHeader.svelte";

	let items = [];
</script>

<div class="w-full sm:w-full h-screen flex flex-row">
	<SettingsTabs {items} />
</div>
