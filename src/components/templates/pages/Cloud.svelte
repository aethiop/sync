<script>
	import Text from "$atoms/Text.svelte";
	import Progress from "$atoms/Progress.svelte";
	import Icon from "$atoms/Icon.svelte";
	import SearchInput from "$molecules/SearchInput.svelte";
	import UploadModal from "$organisms/UploadModal.svelte";
	import FileList from "$organisms/FileList.svelte";
	import { uploading, downloading } from "$lib/cloud.js";
	let value;
</script>

<div class="w-full flex py-4 px-2 flex-row items-center space-x-7 justify-end">
	<Icon name="search" />
	<UploadModal folder="private" />
</div>
<div class="flex-1 h-full rounded-lg">
	<div>
		{#if $uploading > 0 && $uploading < 100}
			<Text type=" px-2 body ">Uploading</Text>
			<Progress progress={$uploading} />
		{/if}
		{#if $downloading > 0 && $downloading < 100}
			<Text type=" px-2 body ">Downloading</Text>

			<Progress progress={$downloading} />
		{/if}
	</div>
	<FileList folder="private" />
</div>
