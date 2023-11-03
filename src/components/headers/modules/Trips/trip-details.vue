<template>
	<HeadersHeaderSlot :title="headstate.title.value" :pre-title="headstate.preTitle.value" class="relative">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
			<div class="flex justify-center items-center">
				<img src="@/assets/icons/source/unfold.svg" alt="" class="h-7 px-0 ml-2 hover:bg-gray-100 cursor-pointer w-10 mb-3 rounded-md" @click="toggleFilter">
			</div>
			<div v-if="showFilter" class="w-[300px] space-y-4 h-[500px] p-3 bg-black rounded-md shadow z-50 absolute top-[120px] left-[120px]">
				<div class="w-full mt-4 px-3">
					<input v-model="search" type="search" placeholder="search.." class="py-2 pl-4 outline-none border hover:border-green05 rounded-md w-full" @keyup.enter="handleSearch">
				</div>
				<div class="space-y-6 overflow-y-auto h-[400px] px-2">
					<div v-for="trip in upcomingTripsList" :key="trip.id" class="bg-white rounded-md text-xs" >
						<div v-if="!loadingUpcomingTrips" class="p-2 cursor-pointer" @click="handleSelectedTrip(trip.id)">
							<RouteDescription class="text-xs" :pickup="trip?.route?.pickup" :destination="trip?.route?.destination" />
							<div class="flex items-center gap-x-3">
								<p class="text-xs pl-3 font-medium">
									{{ trip?.route?.route_code }}
								</p>
								<p class="text-xs pl-3 font-medium">
									{{ trip?.itinerary?.trip_time }}
								</p>
							</div>
						</div>
						<Skeleton v-else height="100px" />
					</div>
				</div>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch'
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'
const { getUpcomingTrips, loadingUpcomingTrips, upcomingTripsList, filterData } = useGetUpcomingTripsList()
const { getUpcomingTripById } = useUpcomingTripIdDetails()
const { headstate } = usePageHeader()

const id = useRoute().params.id
const tripType = (useRoute().name as string).split('-')[2]

const pageTabs = computed(() => [
    {
        name: 'Details',
        path: `/trips/type/${tripType}/${id}/trip-details`
    },
    {
        name: 'Passengers',
        path: `/trips/type/${tripType}/${id}/Passengers`
	},
    {
        name: 'Ratings',
        path: `/trips/type/${tripType}/${id}/Ratings`
	}

])
const showFilter = ref(false)
const toggleFilter = () => {
    showFilter.value = !showFilter.value
}

const search = ref('')

// watch(search, () => {
// 	filterData.search.value = search.value
// 	getUpcomingTrips()
// 	console.log(upcomingTripsList.value, 'shgqs')
// })

const handleSearch = async () => {
	if (search.value.length) {
		filterData.search.value = search.value
	    await getUpcomingTrips()
	}
}

const handleSelectedTrip = async (tripId: string) => {
	await getUpcomingTripById(tripId)
	showFilter.value = !showFilter.value
}
</script>
