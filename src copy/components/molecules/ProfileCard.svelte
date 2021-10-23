<script>
	import Avatar from "$atoms/Avatar.svelte";
	export let profile;
</script>

<div class="w-full flex flex-row space-x-2">
	<div>
		<Avatar name={profile.username} />
	</div>
	<div class="hidden lg:w-full lg:flex flex-row items-center space-x-2">
		<div class="hidden sm:flex w-full ">
			<p
				class="text-on-background text-md font-extrabold tracking-widest"
			>
				{profile.username}
			</p>
		</div>
	</div>
</div>
