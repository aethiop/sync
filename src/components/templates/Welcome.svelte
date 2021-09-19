<script>
	// @ts-nocheck

	import AuthForm from "$organisms/AuthForm.svelte";
	import Header from "$organisms/Header.svelte";
	import LogoTitle from "$molecules/LogoTitle.svelte";
</script>

<Header />
<div
	class="w-full px-3 sm:px-0 sm:w-full pt-24 items-center flex flex-col space-y-10"
>
	<LogoTitle size="lg" />
	<AuthForm />
</div>
