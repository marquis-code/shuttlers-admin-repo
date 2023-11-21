<template>
	<Skeleton v-if="loading_single_iti" height="300px" />
	<main v-else class="flex flex-col gap-4 lg:flex-row">
		<div class="w-full max-w-[250px] flex flex-col gap-2 shrink-0">
			<button class="text-sm text-left bg-green p-3 rounded-md text-white">
				Add Availablity Time
			</button>
			<template v-if="itineraries.length">
				<div v-for="n in itineraries" :key="n.id" class="relative w-full h-[50px] border rounded-md overflow-hidden">
					<router-link :to="`/trips/routes/${$route.params.id}/itineraries/${n.id}`" class="w-full h-full block p-2" active-class="bg-dark text-white">
						{{ n.trip_time }}
					</router-link>
					<button class="text-sm absolute bottom-1 right-2 font-medium" :class="[Number($route.params.iti_id) === n.id ? '!text-light' : 'text-dark']">
						Delete
					</button>
				</div>
			</template>
		</div>
		<div class="w-full flex flex-col gap-4 lg:w-[calc(100%-250px)]">
			<div class="bg-light border rounded-lg p-4 flex flex-col">
				<p class="text-sm text-dark font-medium pb-4">
					{{ itinerary.trip_time }} Trip Time
				</p>
				<div class="flex items-center justify-between p-3 bg-[#f9fbfd]">
					<p class="text-sm text-[#12263f]">
						Starting Time
					</p>
					<div class="flex items-center gap-2">
						<p class="text-sm text-[#12263f]">
							{{ itinerary.trip_time }}
						</p>
						<button class="text-[#39afd1]">
							Edit
						</button>
					</div>
				</div>
				<div class="flex items-center justify-between p-3">
					<p class="text-sm text-[#12263f]">
						Starting Bus Stop
					</p>
					<div class="flex items-center gap-2">
						<p class="text-sm text-[#12263f] text-right max-w-[250px]">
							{{ itinerary.starting_bus_stop?.name || 'N/A' }}
						</p>
						<button class="text-[#39afd1]">
							Edit
						</button>
					</div>
				</div>
				<div class="flex items-center justify-between p-3 bg-[#f9fbfd]">
					<p class="text-sm text-[#12263f]">
						Default Fare
					</p>
					<AmountTextEditor :amount="itinerary.default_fare" />
				</div>
				<div class="flex items-center justify-between p-3">
					<p class="text-sm text-[#12263f]">
						Total Capacity
					</p>
					<p class="text-sm text-[#12263f]">
						{{ itinerary?.total_seats || 'N/A' }}
					</p>
				</div>
			</div>
			<div class="w-full flex flex-col gap-4">
				<div class="bg-light border rounded-lg p-4 flex flex-col">
					<p class="text-sm text-dark font-medium pb-4">
						Default Price Settings
					</p>
					<div class="flex items-center justify-between p-3 bg-[#f9fbfd]">
						<p class="text-sm text-[#12263f]">
							Pricing Type
						</p>
						<select class="min-w-[300px] border p-2 rounded-lg">
							<option>Select Option</option>
							<option v-for="(item, index) in [{ value: 'route_price_table_lookup', label: 'Look Up From Pricing Table' }, { value: 'margin_value_generated', label: 'Auto Generated From Margin' }]"
								:key="index" :value="item.value"
							>
								{{ item.label }}
							</option>
						</select>
					</div>
					<div class="flex items-center justify-between p-3">
						<p class="text-sm text-[#12263f]">
							Pricing Scheme
						</p>
						<select class="min-w-[150px] border p-2 rounded-lg">
							<option>Select Option</option>
							<option v-for="(item, index) in [{ value: 'per_vehicle', label: 'Per Vehicle' }, { value: 'per_seat', label: 'Per Seat' }]"
								:key="index" :value="item.value"
							>
								{{ item.label }}
							</option>
						</select>
					</div>
					<div class="flex items-center justify-between p-3 bg-[#f9fbfd]">
						<p class="text-sm text-[#12263f]">
							Pricing Margin
						</p>
						<div class="flex items-center gap-2">
							<select class="min-w-[150px] border p-2 rounded-lg">
								<option>Select Option</option>
								<option v-for="(item, index) in ['percent', 'flat']"
									:key="index" :value="item"
								>
									{{ item }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<ModulesRoutesItinerariesDriverTable />
			<ModulesRoutesItinerariesConfigurePayment />
		</div>
	</main>
</template>
<script setup lang="ts">
import { useItineraries, useItineraryDrivers } from '@/composables/modules/routes/itineraries'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const { loading, itineraries, getItineraries, loading_single_iti, getSingleItinerary, singleItinerary: itinerary } = useItineraries()

getItineraries()
getSingleItinerary(useRoute().params.iti_id as string)
</script>

<style scoped></style>
