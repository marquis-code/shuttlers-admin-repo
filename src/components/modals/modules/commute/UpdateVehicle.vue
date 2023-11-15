<template>
	<Modal
		modal="$atts.modal"
		title="Select Vehicle"
	>
		<form v-if="!loadingFleets" class="flex flex-col gap-6" @submit.prevent="addVehicle(selected)">
			<div class="field relative">
				<label for="Vehicle">Vehicle</label>
				<select id="Vehicle" v-model="selected.main_vehicle" name="" class="input-field">
					<option v-for="vehicle in formattedVehicle" :key="vehicle" :value="vehicle">
						{{ `${vehicle.brand} - ${vehicle.name} - ${vehicle.registration_number} (${vehicle.drivers[0]?.fname} ${vehicle.drivers[0]?.lname})` }}
					</option>
				</select>
			</div>
			<div class="field relative">
				<label for="Cost">Cost</label>
				<input v-model="selected.cost" type="number" class="input-field">
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="selected.cost <= 0 || Object.keys(selected.main_vehicle).length <= 0">
					<span class="flex justify-center items-center gap-2.5">
						add
					</span>
				</button>
			</div>
		</form>
		<Skeleton v-else height="200px" />
	</Modal>
</template>

<script setup lang="ts">

import { useGetFleets } from '@/composables/modules/fleets/fetch'
import { useUpdateCharter } from '@/composables/modules/Rentals/update'

const { selectedVehicleRental, addVehicle } = useUpdateCharter()

const selected = reactive({
    main_vehicle: {},
    cost: 0
})

watch(selectedVehicleRental, () => {
    selected.main_vehicle = selectedVehicleRental.value.main_vehicle || {}
    selected.cost = selectedVehicleRental.value.cost || 0
}, { immediate: true })

const { filterData, fleetsList, loadingFleets, page_size } = useGetFleets()

const formattedVehicle = computed(() => {
    return fleetsList.value.filter((vehicle) => {
        return vehicle.drivers.length > 0
    })
})

page_size.value = 1000
filterData.type.value = selectedVehicleRental.value.charterVehicle.name

</script>

<style>

</style>
