<script>
	import TextInput from "$atoms/TextInput.svelte";
	import UploadModal from "$organisms/UploadModal.svelte";
	import FileList from "$organisms/FileList.svelte";
	let value;
	let ttl = 3600 * 30;
</script>

<div class="w-full flex py-4 px-4 flex-col items-center justify-end">
	<div class="w-full px-2 lg:w-1/2">
		<TextInput
			placeholder="Search..."
			name="Search"
			icon="search"
			bind:value
		/>
	</div>
	<FileList folder={`trash<?${ttl}`} />
</div>
