<script>
	// @ts-nocheck
	import Logo from "$atoms/Logo.svelte";
	import Title from "$atoms/Title.svelte";
	import AuthForm from "$organisms/AuthForm.svelte";
	import Header from "$organisms/Header.svelte";
</script>

<Header />
<div
	class="w-full px-3 sm:px-0 sm:w-full pt-24 items-center flex flex-col space-y-10"
>
	<Logo class="w-60 h-30" />
	<Title>Galactic</Title>
	<AuthForm />
</div>
