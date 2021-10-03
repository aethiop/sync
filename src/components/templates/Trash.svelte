<script>
	import SubTitle from "$atoms/SubTitle.svelte";
	import UploadModal from "$organisms/UploadModal.svelte";
	import FileList from "$organisms/FileList.svelte";
</script>

<div class="flex flex-col">
	<div class="w-full flex flex-none px-4 items-center justify-between">
		<SubTitle>Trash</SubTitle>
	</div>
	<FileList folder="trash" />
</div>
