<script>
	import Button from "$atoms/Button.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	import FriendModal from "$organisms/FriendModal.svelte";
	let value;
	import FriendList from "$organisms/FriendList.svelte";
</script>

<div class="w-full flex py-4 px-2 flex-row items-center justify-end">
	<div class="w-full pr-4 lg:w-1/2">
		<TextInput
			placeholder="Search..."
			name="Search"
			icon="search"
			bind:value
		/>
	</div>
	<FriendModal />
</div>
<div class="flex-1 h-full rounded-lg">
	<FriendList />
</div>
