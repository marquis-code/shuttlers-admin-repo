<template>
	<section class="mx-10 mt-14 space-y-10">
		<!-- <div class="h-16 bg-white shadow-sm border-[0.4px] rounded-md p-3 w-full flex items-center justify-end">
			<div class="flex justify-end items-end">
				<button class="bg-black text-white px-2 py-2.5 text-xs rounded-md" @click="useTripsModal().openAddPassengersToTrips()">
					Add passengers
				</button>
			</div>
		</div> -->
		<ModulesTripsPassengersList v-if="!loadingRoutePassengers && !loading" :route-passengers="routePassengers" :loading="loading" @next="handleNext" @prev="handlePrev" />
		<Skeleton v-else height="300px" />
	</section>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'
import { useTripsModal } from '@/composables/core/modals'
import { usePageHeader } from '@/composables/utils/header'
import { useActiveTripIdDetails } from '@/composables/modules/trips/id'
const { routePassengersPayload, loadingRoutePassengers, getRoutePassengers, routePassengers, populateRoutePassengers } = useRoutePassengers()
const { selectedTrip, loading, getActiveTripById, handleNext, handlePrev } = useActiveTripIdDetails()

const id = useRoute().params.id as string
getActiveTripById(id)

const computedTitle = computed(() => {
	if (selectedTrip.value.route?.route_code) {
		return `${selectedTrip.value.route.route_code} ●
		 ${useDateFormat(selectedTrip.value?.start_trip, 'h:mm A').value} ● 
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

			const days = ref([] as Record<string, any>)
	days.value.push(selectedTrip.value?.route_day?.trip_date)
	const payload = {
		booking_days: days.value,
		driver_id: selectedTrip.value?.driver?.id
	}
	populateRoutePassengers(payload)
	getRoutePassengers(selectedTrip?.value?.route?.id)
    }
}, { immediate: true })

definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

</script>

<style scoped>

</style>
