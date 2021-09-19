<script>
	// @ts-nocheck

	import Icon from "$atoms/Icon.svelte";

	export let name;
	export let size;
</script>

<div
	class="flex flex-row items-center space-x-4 mx-2 px-4 py-2 bg-surface  rounded-xl"
>
	<div>
		<Icon class="w-7 h-7 text-on-background" name="document" />
	</div>
	<div class="w-full text-on-background truncate">
		{name}
	</div>
	<div class=" font-thin text-on-background flex min-w-max">
		{(size / Math.pow(1024, 2)).toFixed(1)} MB
	</div>
</div>
