<script>
	import Icon from "$atoms/Icon.svelte";
	export let value;
	export let name;
	export let icon;
	export let placeholder;
</script>

<div class="relative flex w-full flex-wrap items-stretch ">
	<input
		bind:value
		{placeholder}
		{name}
		type="text"
		class="peer px-2 py-3 font-bold placeholder-hint text-on-background relative bg-surface rounded-2xl text-md border-0 shadow-md outline-none focus:ring focus:ring-primary w-full pl-10"
	/>
	<span
		class=" h-full leading-snug font-normal text-center text-hint peer-focus:text-on-background  absolute items-center justify-center  pl-3 py-3.5"
	>
		<Icon class="py-0 px-1" name={icon} />
	</span>
</div>

<style>
</style>
