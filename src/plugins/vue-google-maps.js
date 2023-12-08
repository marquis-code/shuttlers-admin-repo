// import Vue from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { defineNuxtPlugin } from '#app'

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyBAfieAIDL1vGbkQd74otnW2t0jkDjiPW0'
//     // language: 'de',
//   }
// })

// export default Vue
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VueGoogleMaps, {
		load: {
		    key: 'AIzaSyBAfieAIDL1vGbkQd74otnW2t0jkDjiPW0'
		    // language: 'de',
		}
	})
	// trackRouter(useRouter())
})
