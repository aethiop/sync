<script>
	import Text from "$atoms/Text.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	let value;
</script>

<div class="w-full flex flex-row py-4 px-4 space-x-4 items-center justify-end">
	<div class="w-full lg:w-1/2">
		<TextInput
			placeholder="Search..."
			name="Search"
			icon="search"
			bind:value
		/>
	</div>
</div>
<div class="w-full  h-full flex justify-center items-center rounded-lg">
	<Text>No notifications here...</Text>
</div>
