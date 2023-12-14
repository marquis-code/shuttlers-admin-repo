<template>
	<div class="flex flex-col gap-1">
		<input v-if="isEdit" v-model="name" type="text" class="text-sm p-1 px-2 border rounded">
		<div class="flex items-center gap-3">
			<input id="pickup" v-model="pickup" type="checkbox" :disabled="!isEdit || disableCheckBox">
			<label for="pickup">Pickup Location</label>
		</div>
		<div class="flex items-center gap-3">
			<input id="dropoff" v-model="dropoff" type="checkbox" :disabled="!isEdit || disableCheckBox">
			<label for="dropoff">Drop-off Location</label>
		</div>

		<div v-if="!isEdit" class="flex items-center gap-4 justify-end mt-3">
			<button class="py-1 px-2 text-red font-medium text-xs" @click="initDeleteBusstop(busStop)">
				Delete
			</button>
			<button class="py-1 px-2 text-light bg-dark text-xs rounded" @click="isEdit = true">
				Edit
			</button>
		</div>
		<div v-else class="flex items-center gap-4 justify-end mt-3">
			<button class="py-1 px-2 text-dark font-medium text-xs" :disabled="editing_busstop" @click="onCancel">
				Cancel
			</button>
			<button class="py-1 px-2 text-light bg-dark text-xs rounded" :disabled="editing_busstop" @click="onSave">
				{{ editing_busstop ? 'Saving' : 'Save' }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouteBustopMap } from '@/composables/modules/routes/bus-stop'

const { editing_busstop, editBusStop, initDeleteBusstop } = useRouteBustopMap()

const props = defineProps({
	busStop: {
        type: Object,
        default: () => {}
    },
	disableCheckBox: {
		type: Boolean,
		default: false
	}
})

const name = ref(props.busStop.name)
const pickup = ref(!!props.busStop.is_pickup)
const dropoff = ref(!!props.busStop.is_dropoff)
const isEdit = ref(false)

const onCancel = () => {
	pickup.value = !!props.busStop.is_pickup
	dropoff.value = !!props.busStop.is_dropoff
	name.value = props.busStop.name
	isEdit.value = false
}

const onSave = () => {
	const payload = {
		name: name.value,
		is_pickup: pickup.value,
		is_dropoff: dropoff.value
    }
	editBusStop(props.busStop.id, payload)
}
</script>

<style scoped>
label{
	@apply m-0 text-sm font-normal
}
</style>
