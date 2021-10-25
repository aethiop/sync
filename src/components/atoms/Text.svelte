<script>
	export let type;
</script>

<p class={$$props.class + type + " font-semibold truncate tracking-widest"}>
	<slot />
</p>
