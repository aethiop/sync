<!-- Logo Atom -->
<script>
	import { Rive, Layout, Fit, Alignment } from "rive-js";
	import { onMount } from "svelte";
	let width, hight, canvas, rive;

	onMount(() => {
		rive = new Rive({
			src: "sync.riv",
			canvas: canvas,
			autoplay: true,
		});
		rive.layout = new Layout({
			fit: Fit.Contain,
			alignment: Alignment.Center,
		});
	});
</script>

<canvas class={$$props.class} width={215} height={160} bind:this={canvas} />
