<script>
	import Text from "$atoms/Text.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	import FriendModal from "$organisms/FriendModal.svelte";
	let value;
	import FriendList from "$organisms/FriendList.svelte";
</script>

<div class="w-full flex py-4 px-2 flex-row items-center justify-between">
	<Text type=" title ">Friends</Text>
	<FriendModal />
</div>
<div class="flex-1 h-full rounded-lg">
	<FriendList />
</div>
