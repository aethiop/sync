<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";
	export let name;
	export let type;
</script>

<!-- File Atom -->
<div
	class="flex flex-row w-full items-center space-x-4 mx-2 px-4 py-2 bg-surface border-2  border-transparent hover:border-primary rounded-xl"
>
	<div>
		{#key type}
			<Icon
				class="w-7 h-7 text-on-background"
				name={type ? type : "document"}
			/>
		{/key}
	</div>
	<div class="w-full text-on-background truncate">
		{name}
	</div>
	<div class="py-2 pr-2 flex flex-row items-center space-x-4">
		<slot />
	</div>
</div>
