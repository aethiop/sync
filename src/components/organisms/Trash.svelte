<script>
	import SubTitle from "$atoms/SubTitle.svelte";
	import UploadModal from "$organisms/UploadModal.svelte";
	import FileList from "$organisms/FileList.svelte";
	let ttl = 3600 * 30;
</script>

<div class="flex flex-col">
	<div class="w-full flex flex-none px-4 items-center justify-between">
		<SubTitle>Trash</SubTitle>
	</div>
	<FileList folder={`trash<?${ttl}`} />
</div>
