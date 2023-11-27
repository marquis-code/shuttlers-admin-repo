<template>
	<Modal
		modal="$atts.modal"
		title="Create itinerary"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="createItinerary">
			<div class="flex flex-col gap-2">
				<label class="label">Select Trip Start Time</label>
				<InputTimeInput v-model="time" />
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Starting Bus Stop</label>
				<Skeleton v-if="loading_busstop" height="45px" radius="10px" />
				<select v-else v-model="busstop_id" required class="input-field">
					<option v-for="n in busStops" :key="n.id" :value="n.id">
						{{ n.name }}
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Default Fare</label>
				<p class="text-xs font-mdeium">
					This is the fare that will be used when no other specific bus stop fare is found for this itinerary
				</p>
				<input v-model="default_fare" required type="number" step="0.01" class="input-field">
			</div>
			<button type="submit" :disabled="!enableButton || loading" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Create Available Time' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCreateItinerary } from '@/composables/modules/routes/itineraries/create'

const { loading, default_fare, busstop_id, time, createItinerary, getRouteBusstops, busStops, loading_busstop, clearObj } = useCreateItinerary()

const enableButton = computed(() => {
	return !!time.value
})

getRouteBusstops()
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
