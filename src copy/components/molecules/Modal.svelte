<script context="module">
	// for passing focus on to the next Modal in the queue.
	// A module context level object is shared among all its component instances. [Read More Here](https://svelte.dev/tutorial/sharing-code)
	const modalList = [];
</script>

<script>
	// @ts-nocheck
	import { booleanStore } from "$lib/boolean";

	const store = booleanStore(false);
	const { isOpen, open, close } = store;
	function keydown(e) {
		e.stopPropagation();
		if (e.key === "Escape") {
			close();
		}
	}
	function transitionend(e) {
		const node = e.target;
		node.focus();
	}
	function modalAction(node) {
		const returnFn = [];
		// for accessibility
		if (document.body.style.overflow !== "hidden") {
			const original = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			returnFn.push(() => {
				document.body.style.overflow = original;
			});
		}
		node.addEventListener("keydown", keydown);
		node.addEventListener("transitionend", transitionend);
		node.focus();
		modalList.push(node);
		returnFn.push(() => {
			node.removeEventListener("keydown", keydown);
			node.removeEventListener("transitionend", transitionend);
			modalList.pop();
			// Optional chaining to guard against empty array.
			modalList[modalList.length - 1]?.focus();
		});
		return {
			destroy: () => returnFn.forEach((fn) => fn()),
		};
	}
</script>

<slot name="trigger" {open} />
{#if $isOpen}
	<div
		class="absolute flex w-full h-full justify-center items-center inset-0"
		use:modalAction
		tabindex="0"
	>
		<div
			class="absolute w-full h-full transition-all px-10 delay-75 backdrop-filter backdrop-blur-sm "
			on:click={close}
		/>

		<div
			class="z-10 bg-surface w-2/3 md:w-1/2 px-2 py-2 rounded-lg text-on-background font-bold"
		>
			<slot name="header" {store} />
			<slot name="content" {store} />
			<slot name="footer" {store} />
		</div>
	</div>
{/if}
