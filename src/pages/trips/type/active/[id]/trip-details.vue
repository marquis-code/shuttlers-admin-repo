<template>
	<main>
		<ButtonGoBack />
		<ModulesTripsTripDetails v-if="!loading" :selected-trip="selectedTrip" :loading="loading" />
		<Skeleton v-else height="70vh" />
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useTripIdDetails } from '@/composables/modules/trips/id'
import { usePageHeader } from '@/composables/utils/header'
import { usePassengersTracking } from '@/composables/modules/trips/tracking'
import { useGetTripPassenger, useShowTripPassengersCard } from '@/composables/modules/trips/passengers'

const { getTripPassenger, tripPassengerData } = useGetTripPassenger()

const { listenToSpecificPassengerLocationAndAddtoMap, listenToallPassengersLocation } = usePassengersTracking()

const { openCard } = useShowTripPassengersCard()

const { selectedTrip, loading, getTripById } = useTripIdDetails()
const id = useRoute().params.id as string
getTripById(id)
getTripPassenger(id)

watch(tripPassengerData, (val) => {
	listenToallPassengersLocation()
	if (val.length > 0) {
		val.forEach((item: any) => {
			listenToSpecificPassengerLocationAndAddtoMap(item.user_id, openCard)
		})
	}
})

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
})

definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

</script>

<style scoped>

</style>
