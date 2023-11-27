<template>
	<Modal
		modal="$atts.modal"
		title="Configure Vehicle Capacity"
	>
		<form class="flex flex-col gap-6 space-y-6" @submit.prevent="configureVehicleCapacity">
			<div class="field relative">
				<label for="branch-name">Vehicle Type</label>
				<select class="input-field" v-bind="form.vehicle_type">
					<option v-for="(itm, idx) in vehicleList" :key="idx" :value="itm.value">
						{{ itm.name }}
					</option>
				</select>
			</div>
			<div class="field relative">
				<label for="branch-address">Number of seats</label>
				<input v-model="form.seats" for="branch-address" type="number" class="input-field">
			</div>

			<div class="flex space-x-6">
				<button @click="useCompaniesModal().closeCorporateVehicleCapacityConfig()" class="bg-gray-800 rounded-md text-white w-full py-3">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="isFormEmpty">
					<span class="flex justify-center text-sm items-center gap-2.5">
						Save
					</span>
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCompaniesModal } from '@/composables/core/modals'
const form = reactive({
 vehicle_type: '',
 seats: ''
})

const isFormEmpty = computed(() => {
    return !!(form.vehicle_type && form.seats)
})

const configureVehicleCapacity = () => {

}

const vehicleList = reactive([
    {
        name: 'Prado SUV',
        value: 'prado_suv'
    },
    {
        name: 'SUV',
        value: 'suv'
    },
    {
        name: 'Mini Bus',
        value: 'mini_bus'
    },
    {
        name: 'Mini Van',
        value: 'mini_van'
    },
    {
        name: 'Sedan',
        value: 'sedan'
    },
    {
        name: 'Bus',
        value: 'bus'
    }
])

</script>

<style>

</style>
