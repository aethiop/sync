<script>
	import { onMount } from "svelte";
	import Avatar from "$atoms/Avatar.svelte";
	import { scale } from "svelte/transition";

	let show = false; // menu state
	let menu = null; // menu wrapper DOM reference

	const showMenu = () => {
		show = true;
	};
	const hideMenu = () => {
		show = false;
	};
	onMount(() => {
		const handleOutsideClick = (event) => {
			if (show && !menu.contains(event.target)) {
				hideMenu();
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === "Escape") {
				hideMenu();
			}
		};

		// add events when element is added to the DOM
		document.addEventListener("click", handleOutsideClick, false);
		document.addEventListener("keyup", handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener("click", handleOutsideClick, false);
			document.removeEventListener("keyup", handleEscape, false);
		};
	});
</script>

<div class="relative" bind:this={menu}>
	<div>
		<button
			on:click={() => (show = !show)}
			class=" z-0 menu focus:outline-none rounded-lg "
			><slot name="button" /></button
		>

		{#if show}
			<div
				in:scale={{ duration: 100, start: 0.95 }}
				out:scale={{ duration: 15, start: 0.95 }}
				class="z-50 origin-top-right mt-2 absolute right-0 w-48  bg-surface
          rounded-xl shadow-lg"
			>
				<slot />
			</div>
		{/if}
	</div>
</div>
