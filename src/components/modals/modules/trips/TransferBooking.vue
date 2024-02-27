<template>
	<Modal :is-medium-modal="true" modal="$atts.modal" title="Transfer Booking" :no-close-btn="true">
		<section class="space-y-4">
			<p v-if="Object.keys(routeObj).length" class="text-gray-500 text-sm">
				Transfer bookings to {{ routeObj?.route_code }} ({{ routeObj?.pickup }} <span
					class="font-semibold">to</span> {{ routeObj?.destination }})
				{{ itineraryObj?.trip_time }}
			</p>
			<div v-if="bookingTransferActiveStep === '1'" class="space-y-6">
				<ModulesTripsBookingTransferSectionOne :booking-transfer-active-step="bookingTransferActiveStep"
					:processing-booking="processingBooking" @route-description="handleSelectedRoute"
					@itinerary-description="handleSelectedItinerary" @stepFormComplete="handleBookingTransferDataStepOne" />
			</div>

			<div v-if="bookingTransferActiveStep === '2'">
				<ModulesTripsBookingTransferSectionTwo :dropoffs="dropoffLocations" :pickups="pickupLocations" :passengers="computedTableData" :loading="loading"
					@passengers="handleTransferPassengersData" @go-back="bookingTransferActiveStep = '1'" />
			</div>
		</section>
	</Modal>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useTripsModal } from '@/composables/core/modals'
import { useBookingTransfer } from '@/composables/modules/trips/transferBooking'
import { useRouteBusstopsByRouteId } from '@/composables/modules/routes/id'
import { useCompletedTripIdDetails } from '@/composables/modules/trips/id'
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'
const { routePassengers } = useRoutePassengers()
const { getRouteBustopsById, busstops } = useRouteBusstopsByRouteId()
const { selectedTrip } = useCompletedTripIdDetails()
const { setBookingTransferPayload, transferPassengers } = useBookingTransfer()
const loading = ref(false)
const processingBooking = ref(false)
const bookingTransferActiveStep = ref('1')

const computedTableData = computed(() => {
	return routePassengers.value.map((passenger) => {
      return {
		...passenger,
		passenger_name: passenger?.passenger_name,
		old_pickup: passenger?.pickup?.location,
		old_dropoff: passenger?.destination?.location,
		new_pickup: '',
		new_dropoff: ''
	  }
	})
})

const route_id = String(selectedTrip.value.route_id)
getRouteBustopsById(route_id)

const routeObj = ref({})
const itineraryObj = ref({})
const handleSelectedRoute = (val) => {
	routeObj.value = val
}
const handleSelectedItinerary = (val) => {
	itineraryObj.value = val
}

const pickupLocations = computed(() => {
	return busstops.value.filter((stop) => stop.is_pickup)
})

const dropoffLocations = computed(() => {
	return busstops.value.filter((stop) => stop.is_dropoff)
})

const bookingTransferPayload = ref({}) as any

const handleTransferPassengersData = (data) => {
	bookingTransferPayload.value = { ...bookingTransferPayload.value, ...data }
	const payload = {
    schedule_bus_stops: bookingTransferPayload.value?.schedule_bus_stops,
    source_itinerary_id: selectedTrip.value.route_itinerary_id,
    destination_itinerary_id: bookingTransferPayload.value?.selectedItinerary?.id,
    start_date: bookingTransferPayload.value.start_date ? bookingTransferPayload?.value?.start_date : moment(new Date()).format('YYYY-MM-DD'),
    end_date: bookingTransferPayload.value.endDate ? bookingTransferPayload?.value?.endDate : moment(new Date()).format('YYYY-MM-DD')
}

setBookingTransferPayload(payload)
transferPassengers().then(() => {
	useTripsModal().closeTransferBooking()
})
}

const handleBookingTransferDataStepOne = (data) => {
	bookingTransferPayload.value = { ...bookingTransferPayload.value, ...data }
	bookingTransferActiveStep.value = '2'
}
</script>
