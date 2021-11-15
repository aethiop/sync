<script>
	import { createEventDispatcher } from "svelte";
	import { slide, fly } from "svelte/transition";
	import { quintIn, quintOut } from "svelte/easing";
	import Icon from "$atoms/Icon.svelte";
	const dispatch = createEventDispatcher();

	export let type = "error";
	export let dismissible = true;
</script>

<div
	class="flex flex-row px-2 py-2 bg-surface justify-between text-on-background rounded-xl items-center"
	in:slide={{ delay: 50, duration: 300, easing: quintOut }}
	out:slide={{ delay: 50, duration: 300, easing: quintIn }}
>
	{#if type === "success"}
		<Icon name="check" />
	{:else if type === "info"}
		<Icon name="info" />
	{:else if type === "error"}
		<Icon name="error" />
	{/if}

	<div class="px-2">
		<slot />
	</div>
	<div>
		{#if dismissible}
			<Icon
				class="cursor-pointer text-error"
				name="close"
				on:click={() => dispatch("dismiss")}
			/>
		{/if}
	</div>
</div>
