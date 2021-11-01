<script context="module">
	// for passing focus on to the next Modal in the queue.
	// A module context level object is shared among all its component instances. [Read More Here](https://svelte.dev/tutorial/sharing-code)
	const modalList = [];
</script>

<script>
	// @ts-nocheck
	import { booleanStore } from "$lib/boolean";
	import { slide } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	// const store = booleanStore(false);
	// const { isOpen, open, close } = store;
	// function keydown(e) {
	// 	e.stopPropagation();
	// 	if (e.key === "Escape") {
	// 		close();
	// 	}
	// }
	let shown = false;

	export function hide() {
		shown = false;
	}
	export function show() {
		shown = true;
	}

	// function transitionend(e) {
	// 	const node = e.target;
	// 	node.focus();
	// }
	// function modalAction(node) {
	// 	const returnFn = [];
	// 	// for accessibility
	// 	if (document.body.style.overflow !== "hidden") {
	// 		const original = document.body.style.overflow;
	// 		document.body.style.overflow = "hidden";
	// 		returnFn.push(() => {
	// 			document.body.style.overflow = original;
	// 		});
	// 	}
	// 	node.addEventListener("keydown", keydown);
	// 	node.addEventListener("transitionend", transitionend);
	// 	node.focus();
	// 	modalList.push(node);
	// 	returnFn.push(() => {
	// 		node.removeEventListener("keydown", keydown);
	// 		node.removeEventListener("transitionend", transitionend);
	// 		modalList.pop();
	// 		// Optional chaining to guard against empty array.
	// 		modalList[modalList.length - 1]?.focus();
	// 	});
	// 	return {
	// 		destroy: () => returnFn.forEach((fn) => fn()),
	// 	};
	// }
</script>

<svelte:window
	on:keydown={(e) => {
		console.log(e);
		if (e.keyCode == 27) {
			hide();
		}
	}}
/>
<slot />
{#if shown}
	<div
		class="absolute flex w-full h-full justify-center items-center inset-0"
		tabindex="0"
	>
		<div
			transition:slide={{ delay: 100, duration: 300, easing: quintOut }}
			class="z-10 bg-surface absolute bottom-0  w-full md:w-1/2  px-2 py-2 rounded-lg text-on-background font-bold"
		>
			<slot name="header" />
			<slot name="content" />
			<slot name="footer" />
		</div>
	</div>
{/if}
