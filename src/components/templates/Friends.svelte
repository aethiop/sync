<script>
	import SubTitle from "$atoms/SubTitle.svelte";
	import FriendModal from "$organisms/FriendModal.svelte";
	import FileList from "$organisms/FileList.svelte";
</script>

<div class="w-full flex flex-row px-4 items-center justify-between">
	<SubTitle>Friends</SubTitle>
	<FriendModal folder="files" />
</div>
<div class="flex-1 h-full rounded-lg">
	<FileList folder="files" />
</div>
