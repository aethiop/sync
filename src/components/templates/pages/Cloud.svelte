<script>
	import Logo from "$atoms/Logo.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	import Icon from "$atoms/Icon.svelte";
	import SearchInput from "$molecules/SearchInput.svelte";
	import UploadModal from "$organisms/UploadModal.svelte";
	import FileList from "$organisms/FileList.svelte";
	let value;
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
	<UploadModal folder="private" />
</div>
<div class="flex-1 h-full rounded-lg">
	<FileList folder="private" />
</div>
