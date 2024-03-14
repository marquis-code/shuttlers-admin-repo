<template>
	<Modal modal="$atts.modal" :title="!isEdit ? 'Add Driver' : 'Update Driver'">
		<form class="flex flex-col gap-4 w-full" @submit.prevent="handleUpdateDriver">
			<div>
				<DriverSelector v-model="driver" />
			</div>
			<div class="space-y-2">
				<div class="flex items-center gap-x-2">
					<input id="updateVehicle" v-model="isUpdateVehicleDisabled" type="checkbox" name="updateVehicle">
					<label for="updateVehicle" class="font-semibold text-sm">{{ !isUpdateVehicleDisabled ? 'Enable': 'Disable' }} Update Vehicle</label>
				</div>
				<VehicleSelector v-model="selectedVehicle" :is-disabled="!isUpdateVehicleDisabled" />
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Cost of supply</label>
				<Skeleton v-if="loading_cost_of_supply" height="40px" radius="10px" />
				<input v-else v-model="cost_of_supply" required type="number" placeholder="Enter cost of supply"
					class="input-field">
			</div>
			<div v-if="itinerary.pricing_type !== 'route_price_table_lookup'" class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label class="label">Seat Utilization</label>
					<input v-model="break_even" required type="number" step="0.01" class="input-field">
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Pricing margin</label>
					<input v-model="pricing_margin" required type="number" step="0.01" class="input-field">
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Pricing margin unit</label>
					<select v-model="pricing_unit" required class="input-field">
						<option
							v-for="n in [{ key: 'Percent', value: 'percent' }, { key: 'Flat amount', value: 'flat' }]"
							:key="n.value" :value="n.value">
							{{ n.key }}
						</option>
					</select>
				</div>
			</div>
			<button type="submit" :disabled="loading || !enableButton"
				class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : `${isEdit ? 'Update Driver' : 'Add Driver'}` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useItineraries } from '@/composables/modules/routes/itineraries'
import { useAddDriver } from '@/composables/modules/routes/itineraries/driver/create'
import { useUpdateDriver } from '@/composables/modules/routes/itineraries/driver/update'
const {
	updateDriver,
	//  vehicle,
	populateUpdateFields
} = useUpdateDriver()

const isUpdateVehicleDisabled = ref(false)

const { singleItinerary: itinerary } = useItineraries()
const { break_even, driver, pricing_margin, pricing_unit, cost_of_supply, loading, addDriver, clearObj, isEdit, loading_cost_of_supply } = useAddDriver()

const enableButton = computed(() => {
	return !!(driver.value?.id && cost_of_supply.value && break_even.value && pricing_margin.value && pricing_unit.value)
})
const selectedVehicle = ref({}) as any
const handleUpdateDriver = () => {
	populateUpdateFields({
		break_even: break_even.value,
		driver: driver.value,
		pricing_margin: pricing_margin.value,
		pricing_unit: pricing_unit.value,
		cost_of_supply: cost_of_supply.value,
		vehicle: selectedVehicle.value
	})
	isEdit.value ? updateDriver() : addDriver()
}

// const selectedDriver = ref({}) as any

watch(driver, (newDriver) => {
	if (newDriver && newDriver.vehicle_id) {
		selectedVehicle.value = newDriver.vehicle
	} else {
		selectedVehicle.value = null
	}
}, {
	immediate: true,
	deep: true
})
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label {
	margin: 0;
}
</style>
