<script>
	import Icon from "$atoms/Icon.svelte";
	import Text from "$atoms/Text.svelte";
	export let items = [];
	export let activeTabValue = 1;

	const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<div
	class="w-full h-full overflow-y-hidden flex flex-col-reverse lg:flex-row py-4 px-1 text-on-background "
>
	<ul
		class="flex mx-auto lg:flex-col justify-center  items-baseline lg:justify-start lg:h-full  lg:w-1/5 lg:mr-4 lg:space-y-4 bg-surface rounded-lg px-2 py-2"
	>
		{#each items as item}
			<li class="w-full" on:click={handleClick(item.value)}>
				<div
					class:bg-background={activeTabValue === item.value}
					class="flex w-full cursor-pointer space-x-2 rounded-lg px-2  flex-row items-center"
				>
					<Icon class="" name={item.icon} />
					<Text class="hidden sm:block pr-2">{item.name}</Text>
				</div>
			</li>
		{/each}
	</ul>
	{#each items as item}
		{#if activeTabValue == item.value}
			<div
				class="w-full h-full overflow-y-scroll flex flex-col space-y-2 px-2"
			>
				<svelte:component this={item.component} />
			</div>
		{/if}
	{/each}
</div>
