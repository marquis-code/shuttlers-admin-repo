<template>
	<ModulesTripsTripDetails v-if="!loading" :selected-trip="selectedTrip" :loading="loading" @next="handleNext" @prev="handlePrev" />
	<Skeleton v-else height="70vh" />
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useUpcomingTripIdDetails, useCancelledTripIdDetails } from '@/composables/modules/trips/id'
import { usePageHeader } from '@/composables/utils/header'
import { usePassengersTracking } from '@/composables/modules/trips/tracking'

const { listenToallPassengersLocation } = usePassengersTracking()
const { selectedTrip, loading, getCancelledTripById, handleNext, handlePrev } = useCancelledTripIdDetails()
const id = useRoute().params.id as string
getCancelledTripById(id)

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
    }
})

definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

</script>

<style scoped>

</style>
