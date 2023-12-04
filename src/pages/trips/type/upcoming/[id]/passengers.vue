<template>
	<section class="mx-10 mt-14 space-y-6">
		<div class="h-16 bg-white shadow-sm border-[0.4px] rounded-md p-3 w-full flex items-center justify-end">
			<div class="flex justify-end items-end">
				<button class="bg-black text-white px-2 py-2.5 text-xs rounded-md"
					@click="useTripsModal().openAddPassengersToTrips()">
					Add passengers
				</button>
			</div>
		</div>
		<ModulesTripsPassengersList v-if="!loadingRoutePassengers" :route-passengers="routePassengers" />
		<Skeleton v-else height="300px" />
	</section>
</template>

<script setup lang="ts">
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'
import { useTripsModal } from '@/composables/core/modals'
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'
const { selectedTrip } = useUpcomingTripIdDetails()
const { routePassengersPayload, loadingRoutePassengers, getRoutePassengers, routePassengers, populateRoutePassengers } = useRoutePassengers()

const id = useRoute().params.id as string
definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

onMounted(() => {
	const days = ref([] as Record<string, any>)
	days.value.push(selectedTrip.value.trip_date)
	const payload = {
		booking_days: days.value,
		driver_id: selectedTrip.value.driver.id
	}
	populateRoutePassengers(payload)
	getRoutePassengers(selectedTrip.value.route.id)
})

</script>

<style scoped></style>
