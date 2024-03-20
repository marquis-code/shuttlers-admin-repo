<template>
	<section v-if="!loadingActiveTrips && filteredActiveTripsList.length > 0" class="h-full flex flex-col gap-4">
		<div class="flex border rounded-2xl p-4 items-center gap-4">
			<form class="relative flex gap-3 w-full max-w-sm" autocomplete="off" @submit.prevent="">
				<MagnifyingGlassIcon class="absolute w-4 text-gray-400 top-[16px] left-3" aria-hidden="true" />
				<input type="text" placeholder="Search active trip" autocomplete="off" class="input-field !bg-transparent  text-start w-full !pl-9">
			</form>
			<ButtonMultiSelectDropdown :children="[{ name: 'Online', value: 'online' }, { name: 'Offline', value: 'offline' }]" title="All status" />
			<ButtonMultiSelectDropdown :children="[{ name: 'Lagos', value: 'lagos' }]" title="All cities" />

			<span class="text-sm font-bold ml-auto">
				Showing {{ filteredActiveTripsList.length }} of {{ page_size }} active trips
			</span>
		</div>

		<div class="flex h-full border rounded-2xl">
			<ModulesTripsActiveTripTrackingCardList :active-trips-list="filteredActiveTripsList" />
			<MapDisplay class="w-7/12 !h-full rounded-r-2xl" />
		</div>
	</section>

	<div v-if="!loadingActiveTrips && filteredActiveTripsList.length ===0" class="flex justify-center items-center h-screen">
		<div class="flex justify-center items-center flex-col">
			<img src="@/assets/icons/source/bus_placeholder.svg" alt="track vehicle empty state">
			<p>There are currently no active trips</p>
		</div>
	</div>
	<Skeleton v-if="loadingActiveTrips" height="100%" radius="16px" />
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { usePageHeader } from '@/composables/utils/header'
import { useVehicleTracking } from '@/composables/modules/tracking/vehicle/fetch'

const { filteredActiveTripsList, loadingActiveTrips, initializeTracking, page_size } = useVehicleTracking()

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
