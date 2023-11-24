<template>
	<Modal
		modal="$atts.modal"
		title="Transfer Booking"
		:no-close-btn="true"
	>
		<section class="space-y-4">
			<p v-if="Object.keys(routeObj).length" class="text-gray-500 text-sm">
				Transfer bookings to {{ routeObj?.route_code }} ({{ routeObj?.pickup }} <span class="font-semibold">to</span> {{ routeObj?.destination }})
				{{ itineraryObj?.trip_time }}
			</p>
			<div v-if="bookingTransferActiveStep === '1'" class="space-y-6">
				<ModulesTripsBookingTransferSectionOne
					:booking-transfer-active-step="bookingTransferActiveStep"
					:processing-booking="processingBooking"
					@route-description="handleSelectedRoute"
					@itinerary-description="handleSelectedItinerary"
					@stepFormComplete="bookingTransferActiveStep = '2'"
				/>
			</div>

			<div v-if="bookingTransferActiveStep === '2'">
				<ModulesTripsBookingTransferSectionTwo @go-back="bookingTransferActiveStep = '1'" :table-data="tableData" :loading="loading" />
			</div>
		</section>
	</Modal>
</template>
<script setup lang="ts">
const loading = ref(false)
const processingBooking = ref(false)
const bookingTransferActiveStep = ref('1')

const tableData = reactive([
	{
		passengers_name: 'Mr Joker',
		old_pickup: 'West End',
		old_dropoff: 'Evercare Hospital Lekki, Bisola Durosinmi Etti Drive, Lagos, Nigeria'
	}
])

const routeObj = ref({})
const itineraryObj = ref({})
const handleSelectedRoute = (val) => {
   routeObj.value = val
}
const handleSelectedItinerary = (val) => {
	itineraryObj.value = val
}
</script>

<style>

</style>
