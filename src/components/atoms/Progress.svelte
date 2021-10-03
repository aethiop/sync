<script>
	export let progress;
</script>

<!-- Progress Atom -->
<div class="flex flex-row items-center space-x-4 px-2">
	<div class="h-3 relative w-full rounded-full overflow-hidden">
		<div class="w-full h-full bg-background absolute" />
		<div
			style={"width: " + $progress + "%"}
			id="bar"
			class="h-full bg-success relative w-0 rounded-2xl"
		/>
	</div>
	<span class="min-w-max">{$progress.toFixed(0)} %</span>
</div>
