module.exports = {
	stories: [
		"../src/stories/**/*.stories.mdx",
		"../src/stories/**/*.stories.@(svelte|jsx|ts|tsx|js)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"storybook-addon-designs",
    "@storybook/addon-svelte-csf",
		// Add everything below here
		{
			name: "@storybook/addon-postcss",
			options: {
				postcssLoaderOptions: {
					implementation: require("postcss"),
				},
			},
		},
	],
};