<template>
	<section class="mx-10 mt-14 space-y-10">
		<ModulesTripsPassengersList v-if="!loadingRoutePassengers && !loading" :route-passengers="routePassengers" :loading="loading" @next="handleNext" @prev="handlePrev " />
		<Skeleton v-else height="300px" />
	</section>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { usePageHeader } from '@/composables/utils/header'
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'
import { useTripsModal } from '@/composables/core/modals'
import { useCompletedTripIdDetails } from '@/composables/modules/trips/id'
const { routePassengersPayload, loadingRoutePassengers, getRoutePassengers, routePassengers, populateRoutePassengers } = useRoutePassengers()
const { selectedTrip, loading, getCompletedTripById, handleNext, handlePrev } = useCompletedTripIdDetails()

const id = useRoute().params.id as string
getCompletedTripById(id)
definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

const computedTitle = computed(() => {
	if (selectedTrip.value.route?.route_code) {
		return `${selectedTrip.value.route.route_code} ●
		 ${selectedTrip.value?.route_vehicle?.route_itinerary?.trip_time} ● 
		 ${selectedTrip.value.driver.fname} ${selectedTrip.value.driver.lname} ●
		 ${useDateFormat(selectedTrip.value.trip_date, 'DD MMMM YYYY').value}`
	}
}) as any

const convertDateFormat = (dateString) => {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    }

watch(computedTitle, (val:string) => {
    if (val) {
        usePageHeader().setPageHeader({
            preTitle: 'OVERVIEW',
            title: val
		})

		const days = ref([] as Record<string, any>)
	days.value.push(convertDateFormat(selectedTrip.value.trip_date_time))
	const payload = {
		booking_days: days.value,
		driver_id: selectedTrip.value.driver.id
	}
		populateRoutePassengers(payload)
		getRoutePassengers(selectedTrip?.value?.route?.id)
    }
}, { immediate: true })
</script>
