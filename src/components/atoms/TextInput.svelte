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
		class=" px-2 py-2 font-semibold placeholder-hint text-on-background relative bg-surface/75 rounded-xl text-md border-0 shadow-sm outline-none focus:ring focus:ring-primary w-full pl-10"
	/>
	<span
		class="  leading-snug text-center text-hint  absolute items-center justify-center  pl-3 py-2"
	>
		<Icon class="py-0.5 px-1" name={icon} />
	</span>
</div>

<style>
</style>
