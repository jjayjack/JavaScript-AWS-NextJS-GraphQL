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
		extend: {}
	},
	plugins: []
};
