<template>
	<div class="w-full max-w-[250px] flex flex-col gap-2 shrink-0">
		<button class="text-sm text-left bg-green p-3 rounded-md text-white" @click="useRouteModal().openAddItinerary()">
			Add Availablity Time
		</button>
		<div v-if="loading" class="flex flex-col gap-2">
			<Skeleton v-for="n in 3" :key="n" height="45px" radius="10px" />
		</div>
		<template v-if="itineraries.length && !loading">
			<div v-for="n in itineraries" :key="n.id" class="relative w-full h-[50px] border rounded-md overflow-hidden">
				<router-link class="w-full h-full flex items-center pl-4" :to="`/trips/routes/${$route.params.id}/itineraries/${n.id}`" active-class="bg-dark text-white">
					{{ n.trip_time }}
				</router-link>
				<button type="button" class="text-sm absolute bottom-1 right-2 font-medium" :class="[Number($route.params.iti_id) === n.id ? '!text-light' : 'text-dark']" @click.stop="initDeleteItinerary(n.id)">
					Delete
				</button>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useItineraries, useDeleteItinerary } from '@/composables/modules/routes/itineraries'
import { useRouteModal } from '@/composables/core/modals'

const { loading, itineraries, getItineraries } = useItineraries()
const { initDeleteItinerary } = useDeleteItinerary()
getItineraries()
</script>
