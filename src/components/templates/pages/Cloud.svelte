<script>
	import Logo from "$atoms/Logo.svelte";
	import Text from "$atoms/Text.svelte";
	import Icon from "$atoms/Icon.svelte";
	import UploadModal from "$organisms/UploadModal.svelte";
	import FileList from "$organisms/FileList.svelte";
	let value;
</script>

<div
	class="w-full flex pt-2 px-2 lg:px-4 flex-row space-x-7 items-center justify-end"
>
	<div class="flex lg:hidden w-full items-center space-x-5 pb-2">
		<Logo class="w-14 h-14 pt-2" />
	</div>
	<div class="flex flex-row  items-center">
		<Icon class="pr-4" name="search" />
		<UploadModal folder="private" />
	</div>
</div>
<div class="flex-1 h-full px-2 lg:px-10 py-4 rounded-lg">
	<FileList folder="private" />
</div>
