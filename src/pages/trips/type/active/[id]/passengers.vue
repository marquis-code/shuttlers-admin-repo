<template>
	<main class="flex flex-col gap-4">
		<ButtonGoBack url="/trips/type/active" class="ml-4 mt-2" />
		<section class="mx-10 space-y-10">
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
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'
import { useTripsModal } from '@/composables/core/modals'
import { usePageHeader } from '@/composables/utils/header'
import { useActiveTripIdDetails } from '@/composables/modules/trips/id'
const { routePassengersPayload, loadingRoutePassengers, getRoutePassengers, routePassengers, populateRoutePassengers, fetchRoutePassengers } = useRoutePassengers()
const { selectedTrip, loading, getActiveTripById, handleNext, handlePrev } = useActiveTripIdDetails()

const id = useRoute().params.id as string
getActiveTripById(id)
fetchRoutePassengers(id)

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
    }
}, { immediate: true })

definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

</script>

<style scoped>

</style>
