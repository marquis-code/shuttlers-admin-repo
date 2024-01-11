<template>
	<div class="bg-light border rounded-lg p-4 flex flex-col">
		<p class="text-sm text-dark font-medium pb-4">
			{{ itinerary.trip_time }} Trip Time
		</p>
		<div class="flex items-center justify-between p-3 bg-[#f9fbfd] gap-4">
			<p class="text-sm text-[#12263f]">
				Starting Time
			</p>
			<div class="flex items-center gap-2">
				<div v-if="editTime" class="flex flex-col gap-2">
					<InputTimeInput v-model="time" />
					<div class="flex items-center gap-2">
						<button class="save_btn" @click="updateItineraries()">
							Save
						</button>
						<button class="close_btn" @click="closeEdit('time')">
							Close
						</button>
					</div>
				</div>
				<p v-else class="text-sm text-[#12263f]">
					{{ itinerary.trip_time }}
				</p>
				<button v-if="!editTime" class="text-[#39afd1]" @click="editTime = true">
					Edit
				</button>
			</div>
		</div>
		<div class="flex items-center justify-between p-3">
			<p class="text-sm text-[#12263f]">
				Starting Bus Stop
			</p>
			<div class="flex items-center gap-2">
				<div v-if="editBusStop" class="flex flex-col gap-2">
					<select v-model="busstop_id" class="input-field">
						<option v-for="n in busStops" :key="n.id" :value="n.id">
							{{ n.name }}
						</option>
					</select>
					<div class="flex items-center gap-2">
						<button class="save_btn" @click="updateItineraries()">
							Save
						</button>
						<button class="close_btn" @click="closeEdit('busStop')">
							Close
						</button>
					</div>
				</div>
				<p v-else class="text-sm text-[#12263f] text-right max-w-[250px]">
					{{ itinerary.starting_bus_stop?.name || 'N/A' }}
				</p>
				<button v-if="!editBusStop" class="text-[#39afd1]" @click="editBusStop = true">
					Edit
				</button>
			</div>
		</div>
		<div class="flex items-center justify-between p-3 bg-[#f9fbfd]">
			<p class="text-sm text-[#12263f]">
				Default Fare
			</p>
			<AmountTextEditor :amount="itinerary.default_fare" @updateVal="updateFare" />
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
	<div class="bg-light border rounded-lg p-4 flex flex-col">
		<div class="pb-4 flex items-center justify-between">
			<p class="text-sm text-dark font-medium">
				Return Trip
			</p>
			<div class="flex items-stretch gap-2">
				<button v-if="itinerary?.itinerary_pair_id" class="text-sm p-2 text-light bg-red rounded-md" @click="initRemovePairedTrip">
					Delete
				</button>
				<button class="text-sm bg-dark p-2 text-light rounded-md" @click="useRouteModal().openPairReturnTrip()">
					{{ itinerary?.itinerary_pair_id ? 'Change' : 'Set' }} return trip
				</button>
			</div>
		</div>
		<p v-if="!itinerary?.itinerary_pair_id" class="test-base text-dark text-center py-3 font-medium">
			No return trip for this route
		</p>
		<template v-else>
			<div class="flex items-center justify-between p-3 bg-[#f9fbfd] gap-4">
				<p class="text-sm text-[#12263f]">
					Starting Time
				</p>
				<div class="flex items-center gap-2">
					<p class="text-sm text-[#12263f]">
						{{ returnTripItinerary.trip_time }}
					</p>
					<NuxtLink class="text-sm font-medium text-green underline" :to="`/trips/routes/${returnTripItinerary?.route_id}/details`">
						View details
					</NuxtLink>
				</div>
			</div>
			<!-- <div class="flex items-center justify-between p-3">
				<p class="text-sm text-[#12263f]">
					Default Fare
				</p>
				<p class="text-sm text-[#12263f]">
					{{ returnTripItinerary?.default_fare ? `₦${returnTripItinerary.default_fare}` : 'N/A' }}
				</p>
			</div> -->
			<div class="flex items-center justify-between p-3 bg-[#f9fbfd] gap-4">
				<p class="text-sm text-[#12263f]">
					Route code
				</p>
				<p class="text-sm text-[#12263f]">
					{{ returnTripItinerary?.route?.route_code || 'N/A' }}
				</p>
			</div>
		</template>
	</div>
	<div class="w-full flex flex-col gap-4">
		<div class="bg-light border rounded-lg p-4 flex flex-col">
			<div class="flex items-center gap-4 justify-between pb-4">
				<p class="text-sm text-dark font-medium">
					Default Price Settings
				</p>
				<button class="border border-dark py-1 px-3 text-sm rounded font-medium" @click="editPricingSetting = !editPricingSetting">
					{{ editPricingSetting ? 'Save' : 'Edit' }}
				</button>
			</div>
			<div class="flex items-center justify-between p-3 bg-[#f9fbfd]">
				<p class="text-sm text-[#12263f]">
					Pricing Type
				</p>
				<select v-model="pricing_type" :disabled="!editPricingSetting || updating" class="min-w-[300px] border p-2 rounded-lg" @change="updateItineraries()">
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
				<select v-model="pricing_scheme" :disabled="!editPricingSetting || updating" class="min-w-[150px] border p-2 rounded-lg" @change="updateItineraries()">
					<option>Select Option</option>
					<option v-for="(item, index) in [{ value: 'per_vehicle', label: 'Per Vehicle' }, { value: 'per_seat', label: 'Per Seat' }]"
						:key="index" :value="item.value"
					>
						{{ item.label }}
					</option>
				</select>
			</div>
			<div v-if="itinerary.pricing_type === 'margin_value_generated'" class="flex items-center justify-between p-3 bg-[#f9fbfd]">
				<p class="text-sm text-[#12263f]">
					Pricing Margin
				</p>
				<div class="flex items-center gap-2">
					<input v-model="pricing_margin" :disabled="!editPricingSetting || updating" type="number" class="input-field !py-2 max-w-[100px]" @change="updateItineraries()">
					<select v-model="pricing_margin_unit" :disabled="!editPricingSetting || updating" class="min-w-[150px] border p-2 rounded-lg" @change="updateItineraries()">
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
</template>

<script setup lang="ts">
import { useItineraries, useUpdateItineraries, useCreateItinerary, usePairReturnTrip } from '@/composables/modules/routes/itineraries'
import { useRouteModal } from '@/composables/core/modals'

const { initRemovePairedTrip } = usePairReturnTrip()
const { loading_busstop, busStops, getRouteBusstops } = useCreateItinerary()
const { singleItinerary: itinerary, returnTripItinerary } = useItineraries()
const { time, resetObj, busstop_id, loading: updating, updateItineraries, default_fare, pricing_type, pricing_margin, pricing_scheme, pricing_margin_unit } = useUpdateItineraries()
const editTime = ref(false)
const editBusStop = ref(false)
const editPricingSetting = ref(false)

const closeEdit = (val:'time'|'busStop') => {
	if (val === 'time') editTime.value = false
	if (val === 'busStop') editBusStop.value = false
	resetObj()
}

const updateFare = (val:Record<'new'|'old', number>) => {
	default_fare.value = val.new
	updateItineraries()
}

getRouteBusstops()
</script>

<style scoped>
.save_btn{
	@apply bg-dark rounded px-2 py-1 text-xs text-light
}
.close_btn{
	@apply border border-dark rounded px-2 py-1 text-xs font-medium text-dark
}
</style>
