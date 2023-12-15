<template>
	<Modal
		modal="$atts.modal"
		:title="actionType === 'edit' ? 'Edit Vehicle Capacity Configuration' : 'Configure Vehicle Capacity'"
	>
		<form class="flex flex-col gap-6 space-y-6" @submit.prevent="createCapacityConfiguration">
			<div class="field relative">
				<label for="branch-name">Vehicle Type</label>
				<div v-if="!loadingVehicleTypes" class="w-full">
					<select v-model="configurationForm.vehicle_type.value" class="input-field w-full">
						<option v-for="(itm, idx) in vehicleTypeslist" :key="idx" :value="itm.name">
							{{ itm.name }}
						</option>
					</select>
				</div>
				<Skeleton v-else height="46px" />
			</div>
			<div class="field relative">
				<label for="branch-address">Number of seats</label>
				<input v-model="configurationForm.seats.value" for="branch-address" type="number" class="input-field">
			</div>

			<div class="flex space-x-6">
				<button class="bg-gray-800 rounded-md text-white w-full py-3" @click="useCompaniesModal().closeCorporateVehicleCapacityConfig()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Save
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCompaniesModal } from '@/composables/core/modals'
import { useGetVehicleTypes } from '@/composables/modules/fleets/vehicle-types'
import { useCreateCapacityConfiguration } from '@/composables/modules/corporates/capacityConfiguration/createCapacityConfiguration'
const { getFleetTypes, loading: loadingVehicleTypes, vehicleTypeslist } = useGetVehicleTypes()
const { createCapacityConfiguration, loading, configurationForm, actionType } = useCreateCapacityConfiguration()

onMounted(() => {
	getFleetTypes()
})

const isFormEmpty = computed(() => {
    return !!(configurationForm.vehicle_type.value && configurationForm.seats.value)
})

onUnmounted(() => {
	actionType.value = 'create'
})

</script>

<style>

</style>
