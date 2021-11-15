<script>
	import Icon from "$atoms/Icon.svelte";
	import ProfileCard from "$molecules/ProfileCard.svelte";
	import { onMount } from "svelte";
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

<div class="relative mt-1.5 w-full" bind:this={menu}>
	<button on:click={() => (show = !show)} class=" z-0 w-full ">
		<slot name="button" />
	</button>

	{#if show}
		<div
			in:scale={{ duration: 100, start: 0.95 }}
			out:scale={{ duration: 15, start: 0.95 }}
			class="z-50 lg:origin-top-left lg:mb-5 absolute bottom-20  lg:bottom-0 lg:right-auto right-0 lg:top-auto lg:left-52 bg-surface px-2 py-2 space-y-2 rounded-xl shadow-lg "
		>
			<slot />
		</div>
	{/if}
</div>
