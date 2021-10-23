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
			boxShadow: {
				sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
				DEFAULT:
					"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
				md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
				xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				"2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
				"3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
				inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
				dark: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
				none: "none",
			},
			transitionProperty: {
				bg: "background-color",
			},
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(var(--gradient-color-stops))",
			},
			animation: {
				blurry: "blur(4px) opacity(0) 0.2s opacity(1)",
				ripple: "scale(4) opacity(0)",
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
			boxShadow: ["dark"],
		},
	},
};
