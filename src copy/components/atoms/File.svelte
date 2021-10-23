<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";
	export let name;
	export let type;
</script>

<!-- File Atom -->
<div
	class="flex flex-row w-full items-center space-x-4 mx-2 px-4 py-2 bg-surface focus-visible:bg-opacity-10  border-transparent  hover:bg-opacity-75 rounded-xl"
>
	<div>
		{#key type}
			<Icon name={type ? type : "document"} />
		{/key}
	</div>
	<div class="w-full text-on-background truncate">
		{name}
	</div>
	<div class="py-2 pr-2 flex flex-row items-center">
		<slot />
	</div>
</div>
