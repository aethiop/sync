<script>
	import Icon from "$atoms/Icon.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	let active = false;
</script>

<div class="search">
	<input type="text" class="input" placeholder="Search..." />
	<button class={active ? "btn active" : "btn"}>
		<Icon
			on:click={() => {
				active = !active;
			}}
			name="search"
		/>
	</button>
</div>

<style>
</style>
