<script>
	export let name = "";
	export let activity = "idle";
</script>

<!-- Avatar Atom -->
<div>
	<div class="avatar">
		<span class="avatar-text">{name?.slice(0, 2).toUpperCase()}</span>
	</div>
</div>
