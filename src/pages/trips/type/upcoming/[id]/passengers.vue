<template>
	<main>
		<ButtonGoBack url="/trips/type/upcoming" class="my-6 ml-8" />
		<section class="mx-10 mt-14 space-y-6">
			<div v-if="!tripTimeHasPassed" class="h-16 bg-white shadow-sm border-[0.4px] rounded-md p-3 w-full flex items-center justify-end">
				<div class="flex justify-end items-end">
					<button class="bg-black text-white px-2 py-2.5 text-xs rounded-md"
						@click="useTripsModal().openAddPassengersToTrips()">
						Add passengers
					</button>
				</div>
			</div>
			<ModulesTripsPassengersList v-if="!loadingRoutePassengers && !loading" :route-passengers="routePassengers" :loading="loading" @next="handleNext" @prev="handlePrev" />
			<Skeleton v-else height="300px" />
		</section>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDateFormat } from '@vueuse/core'
import { usePageHeader } from '@/composables/utils/header'
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'
import { useTripsModal } from '@/composables/core/modals'
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'

const { routePassengersPayload, loadingRoutePassengers, getRoutePassengers, routePassengers, populateRoutePassengers, fetchUpcomingRoutePassengers } = useRoutePassengers()

const { selectedTrip, loading, getUpcomingTripById, handleNext, handlePrev } = useUpcomingTripIdDetails()

const tripTimeHasPassed = ref(false)
const id = useRoute().params.id as string
getUpcomingTripById(id)
fetchUpcomingRoutePassengers(id)

const computedTitle = computed(() => {
	if (selectedTrip.value.route?.route_code) {
		return `${selectedTrip.value.route.route_code} ●
		 ${selectedTrip.value?.route_vehicle?.route_itinerary?.trip_time} ● 
		 ${selectedTrip.value.driver.fname} ${selectedTrip.value.driver.lname} ●
		 ${useDateFormat(selectedTrip.value.trip_date, 'DD MMMM YYYY').value}`
	}
}) as any

watch(computedTitle, (val:string) => {
    if (val) {
        usePageHeader().setPageHeader({
            preTitle: 'OVERVIEW',
            title: val
		})

	// 	const days = ref([] as Record<string, any>)
	// days.value.push(selectedTrip.value.trip_date)
	// const payload = {
	// 	booking_days: days.value,
	// 	driver_id: selectedTrip.value.driver.id
	// }
	// populateRoutePassengers(payload)
	// getRoutePassengers(selectedTrip?.value?.route?.id)
    }
}, { immediate: true })

definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

function checkTripTime() {
	const now = moment()
  const trip = moment(selectedTrip.value.trip_date_time)
  tripTimeHasPassed.value = now.isAfter(trip)
}

onMounted(() => {
  checkTripTime()
})

</script>

<style scoped></style>
