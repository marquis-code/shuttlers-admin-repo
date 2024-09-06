<template>
	<Modal
		modal="$atts.modal"
		title="Select Vehicle"
	>
		<form v-if="!loadingFleets" class="flex flex-col gap-6" @submit.prevent="addVehicle(selected)">
			<div class="field relative">
				<label for="Vehicle">Vehicle</label>
				<InputMultiSelectVehicle :value="selected.main_vehicle" @updated="selected.main_vehicle = $event" />
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="Object.keys(selected.main_vehicle).length <= 0">
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
const { filterData, fleetsList, loadingFleets, page_size } = useGetFleets()

const selected = reactive({
    main_vehicle: {} as Record<string, any>,
    cost: 0
})

watch(selectedVehicleRental, () => {
    selected.main_vehicle = selectedVehicleRental.value.main_vehicle || {}
    selected.cost = selectedVehicleRental.value.cost || 0
}, { immediate: true })

const formattedVehicle = computed(() => {
    return fleetsList.value.filter((vehicle) => {
        return vehicle.drivers.length > 0
    })
})

</script>

<style>

</style>
