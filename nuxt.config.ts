import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'

export default {
	ssr: false,
	target: 'static',
	app: {
		head: {
			title: 'Shuttlers Admin',
			script: [
				{ src: 'https://cdn.quilljs.com/1.1.6/quill.js/', async: true }

			],
			htmlAttrs: { lang: 'en' },
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'format-detection', content: 'telephone=no' }
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
		}
	},

	alias: {
		'@': './src'
	},

	css: ['/src/assets/styles/main.css'],
	components: [
		'@/components',
		{ path: '@/components/core', extensions: ['vue'] }
	],
	plugins: [
		'./src/plugins/vue-google-maps'
	],
	modules: ['@nuxtjs/tailwindcss', 'floating-vue/nuxt'],

	build: {
		transpile: ['vue-google-maps-community-fork', '@googlemaps/markercluster'],
		postcss: {
			postcssOptions: require('./postcss.config.js')
		}
	},
	dir: {
		layouts: './src/layouts',
		pages: './src/pages',
		middleware: './src/middleware'
	},
	tailwindcss: {
		cssPath: '@/assets/css/main.css'
	},
	vite: {
		ssr: {
			noExternal: ['@googlemaps/js-api-loader']
		},
		optimizeDeps: {
			include: [
				'fast-deep-equal'
			]
		},
		plugins: [
			eslintPlugin({ useEslintrc: true })
		],
		server: {
			watch: {
				usePolling: true
			}
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'@public': fileURLToPath(new URL('./public', import.meta.url))
			}
		}
	}
}
