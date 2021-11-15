<script>
	// @ts-nocheck
	import Clipboard from "svelte-clipboard";
	import Text from "$atoms/Text.svelte";
	import Menu from "$molecules/Menu.svelte";
	import ProfileCard from "$molecules/ProfileCard.svelte";
	import { logout } from "$lib/auth.js";
	import { getContext } from "svelte";
	const { theme, toggle } = getContext("theme");
	import Button from "$atoms/Button.svelte";
	import Icon from "$atoms/Icon.svelte";
	import { addToast } from "$lib/store.js";
	import { username } from "$lib/db.js";
	import { profile } from "$lib/store.js";

	const copiedMessage = (what) => {
		addToast({
			message: `${what} has been copied succesfully!`,
			type: "success",
			dismissible: true,
			timeout: 300,
		});
	};
	const changedTheme = (to) => {
		addToast({
			message: `${
				to[0].toUpperCase() + to.slice(1)
			} Mode has been activated!`,
			type: "info",
			dismissible: true,
			timeout: 300,
		});
	};
	$: console.log($theme);
</script>

<div>
	<Menu>
		<div class="w-full" slot="button">
			{#await $profile}
				<p>Loading</p>
			{:then profile}
				<div
					class="flex lg:w-full space-x-2 flex-row items-center justify-between rounded-xl "
				>
					<ProfileCard {profile} />

					<Icon
						class="text-on-background hidden lg:block"
						name="dots"
					/>
				</div>
			{/await}
		</div>
		{#await $profile}
			<p>Loading</p>
		{:then profile}
			<div
				class="flex flex-row items-center space-x-4 py-4 px-4 cursor-pointer"
			>
				<Clipboard text={JSON.stringify(profile.key)} let:copy>
					<div
						class="p-2 rounded-full bg-primary"
						on:click={() => {
							copy();
							copiedMessage("Your secret key");
						}}
					>
						<Icon class="text-on-primary" name="fingerprint" />
					</div>
				</Clipboard>
				<div class="flex flex-col ">
					<Text class="text-on-background">{profile?.username}</Text>
					<Clipboard text={profile?.key?.pub} let:copy>
						<div
							class=" truncate cursor-pointer"
							on:click={() => {
								copy();
								copiedMessage("Your public address");
							}}
						>
							<p
								class="text-xs overflow-ellipsis font-thin text-on-background"
							>
								@{profile?.key?.pub.slice(0, 14)}
							</p>
						</div>
					</Clipboard>
				</div>
			</div>
		{/await}
		<Button
			class="hover:bg-background"
			full={true}
			variant="text"
			left="settings"
			on:click={() => {
				history.pushState(null, "", location.origin + "/#/settings");
			}}
			name="General Settings"
		/>
		<Button
			class="hover:bg-background"
			full={true}
			variant="text"
			left="lock"
			name="Privacy & Security"
		/>
		<Button
			class="hover:bg-background"
			full={true}
			variant="text"
			on:click={() => {
				toggle();
				changedTheme($theme.name);
			}}
			left={$theme.name != "light" ? "sun" : "moon"}
			name={$theme.name != "light" ? "Light Mode" : "Dark Mode"}
		/>

		<Button
			class="hover:bg-background"
			full={true}
			variant="text"
			left="feedback"
			name="Feedback"
		/>
		<Button
			full={true}
			variant="error"
			on:click={logout}
			left="logout"
			name="Logout"
		/>
	</Menu>
</div>
