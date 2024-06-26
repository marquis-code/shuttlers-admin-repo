<template>
	<section class="flex flex-col gap-4 overflow" :class="{ 'h-full' : (!loadingActiveTrips && filteredActiveTripsList.length > 0) }">
		<div class="flex border rounded-2xl p-4 items-center gap-4">
			<form class="relative flex gap-3 w-full max-w-sm" autocomplete="off" @submit.prevent="">
				<MagnifyingGlassIcon class="absolute w-4 text-gray-400 top-[16px] left-3" aria-hidden="true" />
				<input v-model="filterData.search.value" type="text" placeholder="Search active trip" autocomplete="off" class="input-field !bg-transparent  text-start w-full !pl-9">
			</form>
			<ButtonMultiSelectDropdown v-model="filterStatus.status.value" :children="[{ name: 'Online', value: 'online' }, { name: 'Offline', value: 'offline' }]" title="All status" />
			<ButtonMultiSelectDropdown v-model="filterStatus.city.value" :children="formattedCities" :loading="loading" title="All cities" />

			<span class="text-sm font-bold ml-auto">
				Showing {{ filteredActiveTripsList.length }} of {{ total }} active trips
			</span>
		</div>

		<div v-if="!loadingActiveTrips && filteredActiveTripsList.length > 0" class="flex h-full border rounded-2xl ">
			<ModulesTripsActiveTripTrackingCardList :active-trips-list="filteredActiveTripsList" :can-load-more="showLoadMore" :loading="loadingMoreActiveTrips" @loadMore="loadMore" />
			<MapDisplay class="w-7/12 !h-full rounded-r-2xl" map-id="33d190257c86f190" />
		</div>
	</section>

	<div v-if="!loadingActiveTrips && filteredActiveTripsList.length ===0" class="flex justify-center items-center h-full mt-4">
		<div class="flex justify-center items-center flex-col">
			<img src="@/assets/icons/source/bus_placeholder.svg" alt="track vehicle empty state">
			<p v-if="filterData.search.value || filterStatus.status.value || filterStatus.city.value">
				There are currently no active trips for your current query
			</p>
			<p v-else>
				There are currently no active trips
			</p>
		</div>
	</div>
	<Skeleton v-if="loadingActiveTrips" height="100%" radius="16px" class="mt-4" />
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { usePageHeader } from '@/composables/utils/header'
import { useVehicleTracking } from '@/composables/modules/tracking/vehicle/fetch'
import { use_user_city } from '@/composables/auth/register'

const { filteredActiveTripsList, loadingActiveTrips, initializeTracking, total, filterStatus, filterData, showLoadMore, loadMore, loadingMoreActiveTrips } = useVehicleTracking()
const { cityArray, fetchCities, loading } = use_user_city()

initializeTracking()
fetchCities()

const formattedCities = computed(() =>
	cityArray.value.map((i: any) => {
		return {
			name: i.name,
			value: i.city_id
		}
	})
)

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
