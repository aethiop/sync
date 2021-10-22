<script>
	export let progress;
</script>

<!-- Progress Atom -->
<div class="progress-wrap">
	<div class="progress-container">
		<div class="progress-outline" />
		<div
			style={"width: " + progress + "%"}
			id="bar"
			class="progress"
		/>
	</div>
	<p class="progress-text">{ progress.toFixed(0)} %</p>
</div>
