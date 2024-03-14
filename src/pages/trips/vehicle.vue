<template>
	<div v-if="!loadingActiveTrips && activeTripsList.length > 0" class="flex h-full border rounded-2xl">
		<ModulesTripsActiveTripTrackingCardList :active-trips-list="activeTripsList" />
		<MapDisplay class="w-7/12 !h-full rounded-r-2xl" />
	</div>
	<div v-if="!loadingActiveTrips && activeTripsList.length ===0" class="flex justify-center items-center h-screen">
		<div class="flex justify-center items-center flex-col">
			<img src="@/assets/icons/source/bus_placeholder.svg" alt="track vehicle empty state">
			<p>There are currently no active trips</p>
		</div>
	</div>
	<Skeleton v-if="loadingActiveTrips" height="100%" radius="16px" />
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useVehicleTracking } from '@/composables/modules/tracking/vehicle/fetch'

const { activeTripsList, loadingActiveTrips, initializeTracking } = useVehicleTracking()

initializeTracking()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

usePageHeader().setPageHeader({
	title: 'Track vehicle'
})

</script>

<style scoped>

</style>
