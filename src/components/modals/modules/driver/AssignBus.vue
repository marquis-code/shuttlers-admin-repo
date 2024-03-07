<template>
	<Modal
		modal="$atts.modal"
		title="Assign vehicle to driver"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="assignBus">
			<VehicleSelector v-model="selectedVehicle" entity-status="active" />
			<div v-if="vehicleInfo" class="flex flex-col">
				<div v-for="n,i in vehicleInfo" :key="i" class="border-b p-2 flex items-center justify-between gap-4">
					<p class="text-sm font-medium uppercase text-grey4">
						{{ n.title }}
					</p>
					<p class="text-sm text-dark font-medium">
						{{ n.value }}
					</p>
				</div>
			</div>
			<button type="submit" :disabled="loading || !selectedVehicle?.id"
				class="mt-10 text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : 'Assign Vehicle' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAssignBus } from '@/composables/modules/drivers'

const { loading, selectedVehicle, assignBus } = useAssignBus()

const vehicleInfo = computed(() => {
	if (!selectedVehicle.value?.id) return null
	return [
		{ title: 'Brand', value: selectedVehicle.value?.brand || 'N/A' },
		{ title: 'Name', value: selectedVehicle.value?.name || 'N/A' },
		{ title: 'Plate Number', value: selectedVehicle.value?.registration_number || 'N/A' },
		{ title: 'Capacity', value: selectedVehicle.value?.seats || 'N/A' },
		{ title: 'Type', value: selectedVehicle.value?.type || 'N/A' },
		{ title: 'Amenities', value: selectedVehicle.value?.amenities || 'N/A' }
	]
})

onBeforeUnmount(() => selectedVehicle.value = {})
</script>

<style scoped>
label{
	margin: 0;
}
</style>
