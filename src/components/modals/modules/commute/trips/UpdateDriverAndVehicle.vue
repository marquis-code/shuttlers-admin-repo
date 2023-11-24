<template>
	<Modal
		modal="$atts.modal"
		title="Update Trip"
	>
		<form class="flex flex-col gap-6" @submit.prevent="updateTrip(selected)">
			<div class="field relative">
				<label for="Vehicle">Vehicle</label>
				<InputMultiSelectVehicleId :value="selected.vehicle_id" @updated="selected.vehicle_id = $event" />
			</div>
			<div class="field relative">
				<label for="Vehicle">Driver</label>
				<InputMultiSelectDriverId :value="selected.driver_id" @updated="selected.driver_id = $event" />
			</div>
			<div class="field relative">
				<label for="Cost">Supply Cost</label>
				<input v-model="selected.cost_of_supply" type="number" class="input-field">
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="selected.cost_of_supply <= 0 || !selected.vehicle_id || loading">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						update
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useTripOptions } from '@/composables/modules/trips/options'

const { selectedTrip, updateTrip, loading } = useTripOptions()

const selected = reactive({
cost_of_supply: 0,
driver_id: 0,
vehicle_id: 0
})

watch(selectedTrip, () => {
    selected.vehicle_id = selectedTrip.value.vehicle_id || 0
    selected.driver_id = selectedTrip.value.driver_id || 0
    selected.cost_of_supply = selectedTrip.value.cost_of_supply || 0
}, { immediate: true })

</script>

<style>

</style>
