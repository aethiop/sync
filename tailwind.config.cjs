const generateColorClass = (variable) => {
	return ({ opacityValue }) =>
		opacityValue
			? `rgba(var(--${variable}), ${opacityValue})`
			: `rgb(var(--${variable}))`;
};

const textColor = {
	primary: generateColorClass("on-primary"),
	secondary: generateColorClass("on-secondary"),
	background: generateColorClass("on-background"),
	error: generateColorClass("on-error"),
};

const backgroundColor = {
	primary: {
		DEFAULT: generateColorClass("primary"),
		var: generateColorClass("primary-var"),
	},
	secondary: {
		DEFAULT: generateColorClass("secondary"),
		var: generateColorClass("secondary-var"),
	},
	background: generateColorClass("background"),
	surface: generateColorClass("surface"),
	error: generateColorClass("error"),
};

module.exports = {
	purge: ["./src/**/*.svelte"],

	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "var(--primary)",
					var: "var(--primary-var)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					var: "var(--secondary-var)",
				},
				background: "var(--background)",
				surface: "var(--surface)",
				error: "var(--error)",
				hint: "var(--hint)",
				on: {
					primary: "var(--on-primary)",
					secondary: "var(--on-secondary)",
					background: "var(--on-background)",
					error: "var(--on-error)",
				},
			},
		},
	},
	variants: {
		extend: {
			textOpacity: ["dark"],
		},
	},
};
