<script>
	import Logo from "$atoms/Logo.svelte";
	import Text from "$atoms/Text.svelte";
	import IconLink from "$molecules/IconLink.svelte";
	import ProfileMenu from "$organisms/ProfileMenu.svelte";
	export let items = [];
	export let activeTabValue = 1;

	const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<div
	class="w-full mb-5  px-1 mx-4 lg:mx-0 lg:px-0 lg:h-full overflow-y-hidden  flex flex-col-reverse lg:flex-row text-on-background "
>
	<ul
		class="flex items-center rounded-xl lg:rounded-none lg:justify-between flex-row lg:flex-col lg:w-1/5 lg:pt-4 px-4 bg-surface lg:space-y-2 bg-primary[0.25]"
	>
		<div
			class="flex w-full justify-between pr-4 lg:pr-0 lg:space-y-2 lg:flex-col"
		>
			<a
				href="/"
				class="hidden lg:flex w-full justify-center items-center space-x-5 pb-2"
			>
				<Logo class="w-14 h-14" />
			</a>
			{#each items as item}
				<li class="" on:click={handleClick(item.value)}>
					<IconLink
						active={activeTabValue === item.value}
						name={item.name}
						icon={item.icon}
					/>
				</li>
			{/each}
		</div>
		<div class=" lg:w-full">
			<ProfileMenu />
		</div>
	</ul>
	{#each items as item}
		{#if activeTabValue == item.value}
			<div class="w-full pt-7 lg:px-5 h-full overflow-hidden  ">
				<svelte:component this={item.component} />
			</div>
		{/if}
	{/each}
</div>
