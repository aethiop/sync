<script>
	import Button from "$atoms/Button.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	import FriendModal from "$organisms/FriendModal.svelte";
	let value;
	// import FileList from "$organisms/FileList.svelte";
</script>

<div class="w-full flex py-4 px-4 flex-row items-center justify-end">
	<div class="w-full px-2 lg:w-1/2">
		<TextInput
			placeholder="Search..."
			name="Search"
			icon="search"
			bind:value
		/>
	</div>
	<Button name="Add Friend" icon="add" />
	<!-- <FriendModal /> -->
</div>
<div class="flex-1 h-full rounded-lg">
	<!-- <FileList folder="files" /> -->
</div>
