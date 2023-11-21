<template>
	<main class="flex flex-col gap-4 lg:flex-row">
		<div class="w-full max-w-[250px] flex flex-col gap-2 shrink-0">
			<button class="text-sm text-left bg-green p-3 rounded-md text-white">
				Add Availablity Time
			</button>
			<template v-if="itineraries.length">
				<div v-for="n in itineraries" :key="n.id" class="w-full flex gap-2 items-end justify-between border border-dark rounded-md p-2">
					<router-link :to="`/trips/routes/${$route.params.id}/itineraries/${n.id}`" class="w-full h-full">
						{{ n.trip_time }}
					</router-link>
					<button class="text-sm shrink-0 font-medium">
						Delete
					</button>
				</div>
			</template>
		</div>
	</main>
</template>
<script setup lang="ts">
import { useItineraries } from '@/composables/modules/routes/itineraries'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const { loading, itineraries, getItineraries } = useItineraries()

getItineraries()
</script>

<style scoped></style>
