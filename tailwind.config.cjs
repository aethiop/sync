const withOpacity = (variable) => {
	return ({ opacityValue }) =>
		opacityValue
			? `rgba(var(${variable}), ${opacityValue})`
			: `rgb(var(${variable}))`;
};

module.exports = {
	purge: ["./src/**/*.svelte"],
	mode: "jit",
	darkMode: "class",
	theme: {
		extend: {
			animation: {
				blurry: "blur(4px) opacity(0) 0.2s opacity(1)",
			},
			colors: {
				primary: {
					DEFAULT: withOpacity("--primary"),
					var: withOpacity("--primary-var"),
				},
				secondary: {
					DEFAULT: withOpacity("--secondary"),
					var: withOpacity("--secondary-var"),
				},
				background: withOpacity("--background"),
				surface: withOpacity("--surface"),
				error: withOpacity("--error"),
				success: withOpacity("--success"),
				hint: withOpacity("--hint"),
				on: {
					primary: withOpacity("--on-primary"),
					secondary: withOpacity("--on-secondary"),
					background: withOpacity("--on-background"),
					error: withOpacity("--on-error"),
					success: withOpacity("--on-success"),
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
