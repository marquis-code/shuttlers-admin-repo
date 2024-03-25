<template>
	<Modal
		modal="$atts.modal"
		title="Resync Revenue"
	>
		<form class="flex flex-col gap-[16px] w-full" @submit.prevent="resyncRevenue">
			<Skeleton v-if="loading_vehicles" height="100px" radius="10px" />
			<div v-else class="flex flex-col gap-2">
				<div v-for="n in vehicles" :key="n.id" class="flex items-center gap-4 p-3 border shadow rounded-lg" @click="handleClick(n.id)">
					<input type="checkbox" :checked="selectedVehiclesId.includes(n.id)">
					<p>
						{{ n?.brand || '' }} {{ n?.name || '' }} {{ n?.registration_number || '' }}
					</p>
				</div>
			</div>
			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-4 text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-grey8">
				{{ loading ? 'processing...' : 'Proceed' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useResyncRevenues } from '@/composables/modules/partners/payouts/details'

const { loading, vehicles, loading_vehicles, selectedVehiclesId, resyncRevenue, getPartnerVehicles, clearObj } = useResyncRevenues()
const enableButton = computed(() => {
	return !!(selectedVehiclesId.value.length)
})

const handleClick = (id:number) => {
    if (!selectedVehiclesId.value.includes(id)) {
        selectedVehiclesId.value.push(id)
    } else {
        const index = selectedVehiclesId.value.indexOf(id)
        selectedVehiclesId.value.splice(index, 1)
    }
}
getPartnerVehicles()
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
