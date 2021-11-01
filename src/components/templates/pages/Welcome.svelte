<script>
	// @ts-nocheck
	import Logo from "$atoms/Logo.svelte";
	import SubTitle from "$atoms/SubTitle.svelte";
	import Title from "$atoms/Title.svelte";
	import AuthForm from "$organisms/AuthForm.svelte";
</script>

<div class="w-full bg-gradient-to-br from-background to-surface items-center flex flex-row h-screen">
	<div
		class="hidden flex-1 lg:flex flex-col justify-center items-center  h-full"
	>
		<Logo class="w-44 h-44" />
		<Title
			>Sync your files<br /> on the
			<span class="text-primary">galaxy</span></Title
		>
	</div>
	<div
		class="px-10 lg:px-0 flex-1 flex space-y-4 flex-col items-center pt-20 lg:justify-center h-full"
	>
		<div class="pb-10 flex flex-col items-center lg:hidden ">
			<Logo class="w-40 h-40" />
			<Title class=""
				>Sync your files<br /> on the
				<span class="text-primary">galaxy</span></Title
			>
		</div>

		<SubTitle class="hidden lg:block">Type your username...</SubTitle>
		<AuthForm />
	</div>
</div>
