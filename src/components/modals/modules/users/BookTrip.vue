<template>
	<Modal modal="$atts.modal" title="Book a trip" :no-close-btn="false" class="text-center w-[500px]">
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="bookTrip">
			<div class="field relative">
				<label for="route">Select Route</label>
				<select v-if="!loadingMainRoutes" id="route" v-model="form.selectedRoute"
					class="border-red-500 text-sm w-full border outline-none py-2.5 rounded-md px-3">
					<option class="" disabled>
						--- select ---
					</option>
					<option v-for="(route, idx) in mainRoutesList" :key="idx" :value="route">
						{{ `${route.route_code} - From ${route.pickup} To ${route.destination}` }}
					</option>
				</select>
				<Skeleton v-else height="100px" />
			</div>
			<div v-if="Object.keys(form.selectedRoute).length" class="flex justify-between items-center">
				<div class="flex flex-col items-start justify-start">
					<p class="text-xs">
						Pickup
					</p>
					<p class="text-xs">
						{{ `${form.selectedRoute?.pickup.slice(0, 20)}...` }}
					</p>
				</div>
				<div class="flex flex-col items-end justify-end">
					<p class="text-xs">
						Drop-Off
					</p>
					<p class="text-xs">
						{{ `${form.selectedRoute?.destination.slice(0, 20)}...` }}
					</p>
				</div>
			</div>
			<div class="field relative">
				<div v-if="!loadingItineraries" class="w-full">
					<label for="itinerary">Select Itinerary</label>
					<select id="itinerary" v-model="form.route_itinerary_id"
						class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3">
						<option value="" class="" disabled>
							--- select ---
						</option>
						<option v-for="(itinerary, idx) in routeItineraries" :key="idx" :value="itinerary.id">
							{{ itinerary?.trip_time }}
						</option>
					</select>
				</div>
				<Skeleton v-else height="100px" />
			</div>
			<div class="field relative">
				<label for="route">Select Pickup Point</label>
				<select v-if="!loadBusstops" id="route" v-model="form.pickup_point"
					class="border-red-500 text-sm w-full border outline-none py-2.5 rounded-md px-3">
					<option class="" disabled>
						--- select ---
					</option>
					<option v-for="(busStop, idx) in pickupLocations" :key="idx" :value="busStop">
						{{ busStop.name }}
					</option>
				</select>
				<Skeleton v-else height="100px" />
			</div>
			<div class="field relative">
				<label for="route">Select Drop Off Point</label>
				<select v-if="!loadBusstops" id="route" v-model="form.drop_off_point"
					class="border-red-500 text-sm w-full border outline-none py-2.5 rounded-md px-3">
					<option class="" disabled>
						--- select ---
					</option>
					<option v-for="(destination, idx) in destinationPoints" :key="idx" :value="destination">
						{{ destination.name }}
					</option>
				</select>
				<Skeleton v-else height="100px" />
			</div>
			<div class="">
				<label for="startDate">Choose Date</label>
				<InputDateInput id="startDate" v-model="form.startDate" class="font-light" placeholder="Filter by date" />
			</div>
			<div class="field relative">
				<label for="route">Select Payment Source</label>
				<select id="itinerary" v-model="form.payment_source"
					class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3">
					<option value="" class="" disabled>
						--- select ---
					</option>
					<option v-for="(source, idx) in payment_source" :key="idx" :value="source.id">
						{{ source?.name }}
					</option>
				</select>
			</div>
			<div class="">
				<div class="flex items-center gap-x-2">
					<label class="block" for="route">Is Subscription?</label><input id="route" v-model="form.has_subscription" class="block mb-1" type="checkbox" required>
				</div>
				<div v-if="form.has_subscription" class="mb-4">
					<div class="space-y-4">
						<label>Select Pickup Days {{ Object.keys(dayWithIds) }}</label>
						<div class="grid grid-cols-3 gap-4">
							<div
								v-for="(day, index) in Object.keys(dayWithIds)"
								:key="index"
								class="form-check flex items-center gap-x-3"
							>
								<input
									:id="day"
									v-model="form.subscriptionDays"
									class="form-check-input block"
									type="checkbox"
									:value="day"
								>
								<label :for="day" class="form-check-label block">{{
									day.charAt(0).toUpperCase() + day.substring(1)
								}}</label>
							</div>
						</div>
						<div>
							<label>Select Trip Weeks</label>
							<div class="flex items-center gap-4">
								<div
									v-for="item in subscriptionWeeks"
									:key="item.value"
									class="flex items-center gap-x-3"
								>
									<input
										id="item.value"
										v-model="form.tripWeeks"
										class="block"
										type="radio"
										:value="item.value"
									>
									<label :for="String(item.value)" class="block mt-2">{{ item.label }}</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex items-center gap-x-3">
				<label for="route" class="block">With Luggage?</label>
				<input id="route" v-model="form.has_luggage" type="checkbox" class="block" required>
			</div>
			<div v-if="form.has_luggage" class="flex justify-start items-start flex-col">
				<div><label for="route" class="block">Luggage Quantity</label></div>
				<div class="w-full">
					<input v-model="form.luggage_quantity" type="number" class="py-2 border border-gray-500 w-full rounded-md px-3 outline-none">
				</div>
			</div>
			<div v-if="form.drop_off_point">
				<div class="flex items-center gap-x-1">
					<div><label>Fare:</label></div>
					<div v-if="totalFare.fare" class="ml-2 font-bold">
						₦{{ totalFare.fare }}
					</div>
					<span v-else>N/A</span>
				</div>
			</div>

			<div class="flex justify-between items-center gap-x-10">
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full"
					@click="useUserModal().closeBookTrip()">
					Cancel
				</button>
				<button type="submit"
					class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25">
					<span v-if="!createLoading" class="text-xs">Confirm and Book Ride</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useUserModal } from '@/composables/core/modals'
import { useGetMainRoutes } from '@/composables/modules/routes/fetch'
import { useItinerariesByRouteId, useBusstopsByItineraryId, useRoutePricingByItineraryId } from '@/composables/modules/routes/id'
const { getMainRoutesList, loadingMainRoutes, mainRoutesList } = useGetMainRoutes()
const { loading: loadBusstops, getBusstopsByItineraryId, itineraryBusstops } = useBusstopsByItineraryId()
const { routeItineraries, loading: loadingItineraries, getRouteItinerariesByRouteId } = useItinerariesByRouteId()
const { loading: loadingPricing, setRoutePricingDataForm, getRoutePricingInformation, routePricingInformation } = useRoutePricingByItineraryId()
getMainRoutesList()
const form = reactive({
	selectedRoute: {},
	route_id: '',
	route_itinerary_id: null as any,
	pickup_point: null as any,
	drop_off_point: null as any,
	startDate: '',
	payment_source: 'main_balance',
	has_subscription: false,
	has_luggage: false,
	subscriptionDays: [],
	tripWeeks: 0,
	luggage_quantity: ''
})
const fare = ref(null as any)
const createLoading = ref(false)
const subscriptionWeeks = reactive([
	{ label: '1 Week', value: 1 },
	{ label: '2 Weeks', value: 2 },
	{ label: '3 Weeks', value: 3 },
	{ label: '4 Weeks', value: 4 }
])

const dayWithIds = reactive({
        sunday: 1,
        monday: 2,
        tuesday: 3,
        wednesday: 4,
        thursday: 5,
        friday: 6,
        saturday: 7
      })
const destinationPoints = ref([])
const payment_source = reactive([
	{
		id: 'main_balance',
		name: 'Main Balance'
	},
	{
		id: 'company_balance',
		name: 'Company Balance'
	}
])

watch(() => form.selectedRoute, (val) => {
	if (val) {
		getRouteItinerariesByRouteId(form.selectedRoute.id)
	}
})

watch(() => form.pickup_point, (val) => {
	if (val) {
		getDestinationPoints()
	}
})

const getDestinationPoints = () => {
	form.drop_off_point = null
	destinationPoints.value = itineraryBusstops.value.filter(
		(stop) =>
			stop.is_dropoff &&
			(form.pickup_point ? stop.position > form.pickup_point.position : false)
	)
}

const destinations = computed(() => {
	return destinationPoints.value
})

const pickupLocations = computed(() => {
	return itineraryBusstops.value.filter((stop) => stop.is_pickup)
})

watch(() => form.route_itinerary_id, (val) => {
	if (val) {
		getBusstopsByItineraryId(form.route_itinerary_id)
	}
	form.pickup_point = null
	form.drop_off_point = null
})

watch(() => form.has_subscription, (val) => {
	if (!val) {
		form.subscriptionDays = []
		form.tripWeeks = 0
	}
})

watch(() => form.drop_off_point, (val) => {
	if (val) {
		const payload = {
			destination_id: form.drop_off_point.id,
            pickup_id: form.pickup_point.id
		}
		setRoutePricingDataForm(payload)
        getRoutePricingInformation(form?.drop_off_point?.route_id)
    }
})

const tripFare = computed(() => {
	return selectedItinerary.value.default_fare
})
const totalFare = computed(() => {
	let totalFare
	if (form.has_subscription && form.subscriptionDays.length > 0) {
		totalFare = tripFare?.value?.fare * form?.subscriptionDays.length * form.tripWeeks
	} else {
		totalFare = tripFare?.value
	}
	return {
		fare: totalFare || 0,
		currency: 'NGN'
	}
})

const addWeeks = (startDate, numberOfWeeks) => {
	const newDate = new Date(startDate)
	const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000
	const resultDate = new Date(newDate.getTime() + numberOfWeeks * millisecondsInWeek)
	return resultDate
}

function subDays(inputDate, numberOfDays) {
	const newDate = new Date(inputDate)
	const resultDate = new Date(newDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000)
	return resultDate
}

const selectedItinerary = computed(() => {
	return routeItineraries.value.find((itinerary) => itinerary.id === form.route_itinerary_id)
})

const endDate = computed(() => {
	if (form.has_subscription && form.tripWeeks) {
		const _date = addWeeks(new Date(form.startDate), form.tripWeeks)
		return useDateFormat(subDays(_date, 1), 'YYYY-MMM-dd')
	}

	return useDateFormat(form.startDate, 'yyyy-MM-dd')
})

const bookTrip = () => {
	const payload = {
		destination_id: form?.drop_off_point,
        pickup_id: form?.pickup_point
	}
	// setRoutePricingDataForm(payload)
	// getRoutePricingInformation(form?.drop_off_point?.route_id)
}
</script>
