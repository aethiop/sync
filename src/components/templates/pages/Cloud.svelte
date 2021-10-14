<script>
	import TextInput from "$atoms/TextInput.svelte";
	import UploadModal from "$organisms/UploadModal.svelte";
	import FileList from "$organisms/FileList.svelte";
	let value;
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
	<UploadModal folder="private" />
</div>
<div class="flex-1 h-full px-10 py-4 rounded-lg">
	<FileList folder="private" />
</div>
