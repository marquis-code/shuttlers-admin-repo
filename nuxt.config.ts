import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'

export default {
	ssr: false,
	target: 'static',
	app: {
	head: {
		title: 'Shuttlers Admin',
		script: [
			{ src: 'https://cdn.quilljs.com/1.1.6/quill.js/' }
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
	modules: ['@nuxtjs/tailwindcss', 'floating-vue/nuxt'],

	build: {
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
		plugins: [
			eslintPlugin({ useEslintrc: true })
		],
			optimizeDeps: {
		},
		server: {
			watch: {
				usePolling: true
			}
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	}
}
