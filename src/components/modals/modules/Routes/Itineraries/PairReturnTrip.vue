<template>
	<Modal
		modal="$atts.modal"
		title="Add Return Trip"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="pairReturnTrip">
			<RouteSelector @selected="routeSelected" />
			<div class="flex flex-col gap-2">
				<label class="label">Select Itinerary</label>
				<select v-model="selectedItineraries" required class="input-field">
					<option v-for="n in itineraries" :key="n.id" :value="n.id">
						{{ n.trip_time }}
					</option>
				</select>
			</div>
			<!-- <div class="flex flex-col gap-2">
				<label class="label">Default fare</label>
				<input v-model="return_fare" required type="number" step="0.01" class="input-field">
			</div> -->

			<button type="submit" :disabled="loading || !enableButton"
				class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : 'Proceed' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { usePairReturnTrip } from '@/composables/modules/routes/itineraries'

const { loading, enableButton, clearObj, routes, itineraries, selectedItineraries, selectedRoutes, pairReturnTrip } = usePairReturnTrip()
const routeSelected = (val: Record<string, any>) => {
	selectedRoutes.value = val
}

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
