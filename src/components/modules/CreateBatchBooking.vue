<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="bg-white rounded-md border w-full lg:w-6/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Batch book a trip
				</p>
			</div>
			<hr>
			<form class="space-y-6 p-6 mt-5" @submit.prevent="bookTrip">
				<div class="flex items-center gap-x-2">
					<label class="form-label">Upload Customer emails (csv only)</label>
					<button :disabled="downloading" class="font-medium text-xs text-white px-3 py-2 bg-black rounded-md" @click.prevent="downloadCsv">
						{{ downloading ? 'downloading..' : 'Download' }} csv template
					</button>
				</div>
				<div>
					<ModulesUsersBatchBookingCsvFileUploadInput @emails="handleUploadedEmails" />
				</div>

				<div class="field relative w-full">
					<RouteSelector class="w-full" @selected="routeSelected" />
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
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-3">
						<label for="return" class="m-0">Enable return</label>
						<input id="return" v-model="form.has_return" type="checkbox">
					</div>
					<template v-if="form.has_return">
						<Skeleton v-if="returnTripLoading" height="100px" />
						<div v-if="returnTripItinerary.id && !returnTripLoading" class="flex flex-col gap-2">
							<p class="text-sm font-bold">
								Return trip details
							</p>
							<div class="flex items-center justify-between">
								<p class="text-sm">
									Time:
								</p>
								<p class="text-dark font-medium text-sm">
									{{ returnTripItinerary.trip_time }}
								</p>
							</div>
							<div class="flex items-center justify-between">
								<p class="text-sm">
									Route code:
								</p>
								<p class="text-dark font-medium text-sm">
									{{ returnTripItinerary?.route?.route_code || 'N/A' }}
								</p>
							</div>
						</div>
					</template>
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
						<label class="block" for="route">Is Subscription?</label><input id="route" v-model="form.has_subscription" class="block mb-1" type="checkbox">
					</div>
					<div v-if="form.has_subscription" class="mb-4">
						<div class="space-y-4">
							<label>Select Pickup Days</label>
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
					<input id="route" v-model="form.has_luggage" type="checkbox" class="block">
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
							{{ convertToCurrency(totalFare.fare) }}
						</div>
						<span v-else>₦ 0.00</span>
					</div>
				</div>

				<div v-if="!selectedRoute_charges_loading" class="flex flex-col">
					<h1 v-if="selectedRoute_charges.length" class="font-medium pt-4 mt-5 text-sm border-t border-grey10">
						Additional Charge
					</h1>
					<div v-if="selectedRoute_charges.length" class="flex flex-col">
						<div v-for="charge in selectedRoute_charges" :key="charge.id" class="list mt-2">
							<div class="flex gap-2 items-center">
								<div class="flex gap-2">
									<span class="text-grey5 text-sm"> {{ charge.name }}  </span>
									<VTooltip>
										<a class="cursor-pointer">
											<!-- <Icon name="help" class="w-4" /> -->
											<img src="@/assets/icons/source/help.svg" class="w-4" alt="">
										</a>

										<template #popper>
											{{ charge.description }}
										</template>
									</VTooltip>
								</div>

								<ToggleButtonSmall v-if="!charge.is_compulsory" v-model="charge.selected" :name="charge.name" label="" class="m-0 p-0" />
							</div>

							<span class="text-dark font-medium"> {{ convertToCurrency(charge.total) }}</span>
						</div>
					</div>
				</div>

				<div v-if="totalFare.fare" class="flex items-center justify-between gap-2 w-full">
					<p class="text-sm font-medium">
						Pay per user:
					</p>
					<p class="font-bold text-green">
						{{ convertToCurrency(totalPay) }}
					</p>
				</div>

				<div>
					<button :disabled="!isFormEmpty" type="submit"
						class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25">
						<span v-if="!loading" class="text-xs">Confirm and Book Ride</span>
						<Spinner v-else />
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
import useCsvDownload from '@/composables/core/useCsvDownload'
import { useGetMainRoutes } from '@/composables/modules/routes/fetch'
import { useCreateBatchBooking } from '@/composables/modules/batchBooking/create'
import { useItinerariesByRouteId, useBusstopsByItineraryId, useRoutePricingByItineraryId } from '@/composables/modules/routes/id'

const { getMainRoutesList, loadingMainRoutes, mainRoutesList } = useGetMainRoutes()
const { loading: loadBusstops, getBusstopsByItineraryId, itineraryBusstops } = useBusstopsByItineraryId()
const { routeItineraries, loading: loadingItineraries, getRouteItinerariesByRouteId } = useItinerariesByRouteId()
const { loading: loadingPricing, setRoutePricingDataForm, getRoutePricingInformation, routePricingInformation } = useRoutePricingByItineraryId()
const { downloadCsv, downloading } = useCsvDownload()
const { createBatchBooking, loading, populateBatchBookingForm, batchBookingResult, form, isFormEmpty, routeSelected, handleUploadedEmails, endDate, selectedItinerary, selectedRoute_charges, selectedRoute_charges_loading, returnTripItinerary, returnTripLoading, clearObj } = useCreateBatchBooking()
getMainRoutesList()

function getDayOfWeek(startDate) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const start = new Date(startDate)
  const startDayIndex = start.getDay()

  return startDayIndex
}

const bookTrip = async () => {
	let dayIds = [] as any

		if (!form.subscriptionDays.length) {
		const formattedStartDate = new Date(form.startDate) as any
		dayIds.push(getDayOfWeek(formattedStartDate) + 1)
		} else {
		dayIds = form.subscriptionDays.map((day) => dayWithIds[day])
		}
	const payload:Record<string, any> = {
        booking: {
			route_id: form?.selectedRoute?.id,
			itinerary_id: form?.route_itinerary_id,
			pickup_id: form?.pickup_point?.id,
			destination_id: form?.drop_off_point.id,
			days_ids: dayIds,
			meta: JSON.stringify(form.selectedRoute),
			start_date: form?.startDate,
			end_date: endDate.value,
			recurring: form?.has_subscription ? Number(1) : Number(0),
			payment_source: form?.payment_source,
			luggage_quantity: form?.luggage_quantity,
			additional_charges_id: selectedRoute_charges.value.filter((el) => el.selected).map((obj) => obj.id)
		},
	   users: form.uploadedUsers
	}
	populateBatchBookingForm(payload)
	await createBatchBooking().then(() => {
		useRouter().push(`/users/bookings/${batchBookingResult.value.id}/booking-info`)
	})
}

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
const destinationPoints = ref([] as any[])
const payment_source = reactive([
	{
		id: 'main_balance',
		name: 'Main Balance'
	},
	{
		id: 'credit_balance',
		name: 'Company Balance'
	},
	{
		id: 'instant_payment',
		name: 'Charge my company'
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
	// return selectedItinerary?.value?.default_fare || 0
	return routePricingInformation.value[0]?.fare || 0
})

const totalFare = computed(() => {
	let totalFare = null as any
	if (form.has_subscription && form.subscriptionDays.length > 0) {
		totalFare = tripFare?.value * form?.subscriptionDays.length * form.tripWeeks
	} else {
		totalFare = tripFare?.value
	}
	return {
		fare: totalFare,
		currency: 'NGN'
	}
})

const totalPay = computed(() => {
	let x = totalFare.value.fare
	for (const el of selectedRoute_charges.value) {
		if (el.selected) x += el.total
	}
	return x
})

onBeforeUnmount(() => clearObj())

</script>

<style scoped>
.list{
    @apply flex justify-between items-center
}
</style>
