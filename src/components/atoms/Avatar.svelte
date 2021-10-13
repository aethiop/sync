<script>
	export let name;
</script>

<!-- Avatar Atom -->
<div>
	<div
		class="w-12 h-12 pt-1 flex  items-center bg-opacity-40 justify-center bg-primary rounded-full text-on-primary text-xl font-bold"
	>
		<span class="text-primary">{name?.slice(0, 1).toUpperCase()}</span>
	</div>
	<div
		class="relative bottom-2 ml-9 w-3 h-3 ring-4 ring-surface rounded-full bg-success"
	/>
</div>
