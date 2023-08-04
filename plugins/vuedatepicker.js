import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('date-picker', DatePicker)
})
