<script>
	// @ts-nocheck

	import Header from "$organisms/Header.svelte";

	import Private from "$templates/Private.svelte";
	import Public from "$templates/Public.svelte";
	import Friends from "$templates/Friends.svelte";
	import Trash from "$templates/Trash.svelte";
	import Tabs from "$molecules/Tabs.svelte";
	let items = [
		{
			name: "Private",
			icon: "secret",
			value: 1,
			component: Private,
		},
		{
			name: "Public",
			icon: "world",
			value: 2,
			component: Public,
		},
		{
			name: "Friends",
			icon: "friends",
			value: 3,
			component: Friends,
		},
		{
			name: "Trash",
			icon: "trash",
			value: 4,
			component: Trash,
		},
	];
</script>

<div class="w-full sm:w-full h-screen flex flex-col">
	<Header />
	<Tabs {items} />
</div>
