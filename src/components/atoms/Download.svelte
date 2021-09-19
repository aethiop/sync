<script>
	import Icon from "$atoms/Icon.svelte";
	export let url;
	export let name;
	export let size;
</script>

<a
	href={url}
	download={name}
	class="flex flex-row w-full items-center space-x-4 mx-2 px-4 py-2 shadow-md bg-surface  rounded-xl"
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
</a>
