<template>
	<div class="flex flex-col gap-1">
		<input v-model="name" type="text" class="text-sm p-1 px-2 border rounded">
		<div class="flex items-center gap-3">
			<input id="pickup" v-model="pickup" type="checkbox">
			<label for="pickup">Pickup Location</label>
		</div>
		<div class="flex items-center gap-3">
			<input id="dropoff" v-model="dropoff" type="checkbox">
			<label for="dropoff">Drop-off Location</label>
		</div>

		<div class="flex items-center gap-4 justify-end mt-3">
			<button class="py-1 px-2 text-dark font-medium text-xs" :disabled="adding_busstop" @click="onCancel">
				Cancel
			</button>
			<button class="py-1 px-2 text-light bg-dark text-xs rounded" :disabled="adding_busstop" @click="onSave">
				{{ adding_busstop ? 'Saving' : 'Save' }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouteBustopMap } from '@/composables/modules/routes/bus-stop'

const { open_new_busstop_window, reloadBusStopMap, new_busstop_position, adding_busstop, createBusstop } = useRouteBustopMap()

const props = defineProps({
	position: {
        type: Object,
        default: () => {}
    }
})

const name = ref('New Bus stop')
const pickup = ref(true)
const dropoff = ref(true)

const onCancel = () => {
	open_new_busstop_window.value = false
	name.value = 'New Bus stop'
	pickup.value = true
	dropoff.value = true
}

const onSave = () => {
	const payload = {
		name: name.value,
		is_pickup: pickup.value,
		is_dropoff: dropoff.value,
		geometry: `${new_busstop_position.value.lat},${new_busstop_position.value.lng}`
    }
	createBusstop(payload)
}
</script>

<style scoped>
label{
	@apply m-0 text-sm font-normal
}
</style>
