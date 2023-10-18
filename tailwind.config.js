/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
	'./node_modules/@shuttlershq/shuttlers-ui/src/stories/atoms/**/*',
	'./src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
	'./src/pages/**/*.vue'
	],
  theme: {
  extend: {
			colors: {
				light: 'var(--light)',
				dark: 'var(--dark)',
				primary: 'var(--primary)',
				green05: 'var(--green05)',
				green06: 'var(--green06)',
				green7: 'var(--green7)',
				green08: 'var(--green08)',
				green09: 'var(--green09)',
				yellow01: 'var(--yellow01)',
				grey: 'var(--grey)',
				grey2: 'var(--grey2)',
				grey3: 'var(--grey3)',
				grey4: 'var(--grey4)',
				grey5: 'var(--grey5)',
				grey5_5: 'var(--grey5_5)',
				grey6: 'var(--grey6)',
				grey8: 'var(--grey8)',
				grey9: 'var(--grey9)',
				grey10: 'var(--grey10)',
				grey11: 'var(--grey11)',
				grey12: 'var(--grey12)',
				neut1: 'var(--neut1)',
				neut2: 'var(--neut2)',
				neut3: 'var(--neut3)',
				neut5: 'var(--neut5)',
				neut6: 'var(--neut6)',
				neut9: 'var(--neut9)',
				purp02: 'var(--purp02)',
				purp7: 'var(--purp7)',
				purp05: 'var(--purp05)',
				shuttlersGreen: '#0DAC5C',
				blu06: 'var(--blu06)',
				red: 'var(--red)',
				green: 'var(--green)'
			},
			boxShadow: {
				'3xl': '4px 4px 16px 5px rgba(27, 25, 36, 0.12)',
				banner: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
			},
			maxWidth: {

			}
		}
  },
	plugins: [
	require('@tailwindcss/forms')({
      strategy: 'class'
     }),
     require('@tailwindcss/container-queries')
  ]
}
