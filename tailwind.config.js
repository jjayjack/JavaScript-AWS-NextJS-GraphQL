/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		container: {
			center: true,
			paddingTop: "2rem"
		},
		colors: {
			primary: "#393e41",
			secondary: "#3f88c5",
			tertiary: "#f6f7eb",
			quaternary: "#44bba4",
			hover: "#2b608d",
			danger: "#e94f37"
		},
		extend: {}
	},
	plugins: []
};
