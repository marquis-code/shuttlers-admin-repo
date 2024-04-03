<template>
	<input
		:id="id"
		ref="autocompleteInput"
		:class="inputClass"
		type="text"
		:placeholder="placeholder"
		required
		:value="(modelValue as Record<string, any>)?.name"
		@input="isEmpty"
	>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isObject } from '@vue/shared'
import { loader } from '@/composables/core/map'

const props = defineProps({
  modelValue: { type: [Object, String], default: () => {} },
  placeholder: { type: String, default: '' },
  id: { type: String, default: 'autocomplete' },
  inputClass: { type: String, default: 'relative w-full' },
  busStop: { type: Boolean, dafault: false }
})
const emit = defineEmits(['update:modelValue', 'change'])

const options = {
     componentRestrictions: { country: ['NG'] },
    fields: ['address_components', 'geometry', 'name']

}
const autocompleteInput = ref(null)
const autocomplete = ref()
const isEmpty = () => {
	if (!(document.getElementById(props.id)as HTMLInputElement).value) return emit('update:modelValue', {})
}
const modelValueProp = toRef(props, 'modelValue')

onMounted(async () => {
	const fillInAddress = () => {
		const place = autocomplete.value.getPlace()
		const lat = place.geometry.location.lat()
		const lng = place.geometry.location.lng()

		const latlng = { lat, lng }

		const emitter = {
			name: (document.getElementById(props.id) as HTMLInputElement).value, ...latlng
		}
		emit('update:modelValue', emitter)
		emit('change', emitter)
	}
	if (!isObject(modelValueProp.value) && modelValueProp.value) {
		(document.getElementById(`${props.id}`) as HTMLInputElement).value = modelValueProp.value
	}

	const { Autocomplete } = await loader.importLibrary('places')

	autocomplete.value = new Autocomplete(
			document.getElementById(props.id) as HTMLInputElement,
			options
		)

        autocomplete.value.addListener('place_changed', fillInAddress)

	// })
})
</script>

<style scoped>

</style>
