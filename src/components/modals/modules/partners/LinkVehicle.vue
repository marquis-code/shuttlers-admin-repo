<template>
	<Modal
		modal="$atts.modal"
		title="Link Vehicle"
	>
		<form class="flex flex-col gap-[16px] w-full" @submit.prevent="isDeductFromRevenue ? deductRevenue() : deduct()">
			<div class="flex flex-col gap-2">
				<p class="text-base text-dark font-medium">
					Select vehicle to link
				</p>
				<p class="text-sm text-grey5">
					You can select multiple vehicles
				</p>
			</div>
			<!-- <VehicleSelector v-model="selectedVehicle" />
			<div class="field relative">
				<label for="Vehicle">Vehicle</label>
				<InputMultiSelectVehicle @updated="selectedVehicle = $event" />
			</div>

			{{ selectedVehicle }} -->

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : `${isDeductFromRevenue ? 'Deduct Revenue' : 'Deduct'}` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useDeductPayout } from '@/composables/modules/partners/payouts'

const { loading, clearObj, amount, total_amount, desc, yes_text, deduct, isDeductFromRevenue, deductRevenue } = useDeductPayout()
const enableButton = computed(() => {
	return !!(amount.value && amount.value < total_amount.value! && yes_text.value === 'YES')
})

const selectedVehicle = ref()
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
