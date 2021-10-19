<script>
	import Button from "$atoms/Button.svelte";
	import Form from "$molecules/Form.svelte";
	import TextInput from "$atoms/TextInput.svelte";
	import { getContext } from "svelte";
	import FriendModal from "$organisms/FriendModal.svelte";
	const { theme, update } = getContext("theme");
	let value;
	import FileList from "$organisms/FileList.svelte";
	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
			  }
			: null;
	}

	export const changePrimary = (hex) => {
		var color = hexToRgb("#" + hex);
		$theme.colors.primary = `${color.r}, ${color.g}, ${color.b}`;
		update();
		console.log($theme.colors.primary);
	};
	let colorFields = [
		{
			name: "color",
			id: "color",
			type: "text",
			value: "",
			placeholder: "#XXXXXX",
			inputType: "text",
			inputIcon: "at",
		},
	];
</script>

<div class="w-full flex py-4 px-4 flex-row items-center justify-end">
	<div class="w-full px-2 lg:w-1/2">
		<TextInput
			placeholder="Search..."
			name="Search"
			icon="search"
			bind:value
		/>
	</div>
	<Button name="Add Friend" icon="add" />
	<!-- <FriendModal /> -->
</div>
<div class="flex-1 w-full h-full rounded-lg">
	<!-- <FileList folder="files" /> -->
	<!-- <Form
		pos="center"
		icon="fire"
		submitValue="Change Primary"
		onSubmit={({ color }) => {
			console.log(color);
			// console.log($theme);
			changePrimary(color);
		}}
		fields={colorFields}
	/> -->
</div>
