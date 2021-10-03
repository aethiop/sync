<script>
	export let name;
</script>

<!-- Avatar Atom -->
<div
	class="w-12 h-12 flex items-center justify-center bg-primary rounded-xl text-on-primary text-xl font-bold"
>
	{name?.slice(0, 1).toUpperCase()}
</div>
