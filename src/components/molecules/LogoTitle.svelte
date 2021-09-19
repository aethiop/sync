<script>
	import Logo from "$atoms/Logo.svelte";
	import Heading from "$atoms/Heading.svelte";
	import Title from "$atoms/Title.svelte";

	export let size = "sm";
</script>

{#if size == "sm"}
	<div class="flex items-center space-x-4">
		<Logo class="w-16 h-16" />
		<Heading>Galactic</Heading>
	</div>
{:else}
	<Logo class="w-60 h-30" />
	<Title>Galactic</Title>
{/if}
