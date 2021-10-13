<script>
	import TextInput from "$atoms/TextInput.svelte";
	import UploadModal from "$organisms/UploadModal.svelte";
	import FileList from "$organisms/FileList.svelte";
	export let value;
</script>

<div class="w-full flex flex-row px-4 items-center">
	<TextInput placeholder="Search..." name="Search" icon="search" bind:value />
	<UploadModal folder="files" />
</div>
<div class="flex-1 h-full rounded-lg">
	<FileList folder="files" />
</div>
