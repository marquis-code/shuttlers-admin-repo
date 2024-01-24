<template>
	<Modal
		modal="$atts.modal"
		:title="!isEdit ? 'Add Driver' : 'Update Driver'"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="isEdit ? updateDriver() : addDriver()">
			<DriverSelector v-model="driver" />
			<div class="flex flex-col gap-2">
				<label class="label">Cost of supply</label>
				<Skeleton v-if="loading_cost_of_supply" height="40px" radius="10px" />
				<input v-else v-model="cost_of_supply" required type="number" placeholder="Enter cost of supply" class="input-field">
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
						<option v-for="n in [{key: 'Percent', value: 'percent'}, {key: 'Flat amount', value: 'flat'}]" :key="n.value" :value="n.value">
							{{ n.key }}
						</option>
					</select>
				</div>
			</div>
			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : `${isEdit ? 'Update Driver' : 'Add Driver'}` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useItineraries } from '@/composables/modules/routes/itineraries'
import { useAddDriver } from '@/composables/modules/routes/itineraries/driver/create'
import { useAlert } from '@/composables/core/notification'

const { singleItinerary: itinerary } = useItineraries()
const { break_even, driver, pricing_margin, pricing_unit, cost_of_supply, loading, addDriver, clearObj, isEdit, loading_cost_of_supply, updateDriver } = useAddDriver()

const enableButton = computed(() => {
	return !!driver.value?.id
})

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
