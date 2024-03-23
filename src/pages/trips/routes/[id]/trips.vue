<template>
	<main class="">
		<ButtonGoBack url="/trips/routes" class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="computedRoutesTrips" :has-options="true">
			<template #header>
				<div class="flex items-end justify-end">
					<TableFilter :filter-type="{showDateRange: true}" @filter="onFilterUpdate" />
					<div class="bg-white border-[0.4px] py-2 w-full pr-4">
						<div class="flex items-end justify-end gap-x-3">
							<div>
								<select v-model="filterData.itineraryId.value" class="border outline-none w-full border-gray-600 px-3 py-2.5 rounded-md">
									<option value="all">
										All itineraries
									</option>
									<option v-for="(itm, idx) in itineraries" :key="idx" :value="itm.id">
										{{ itm.trip_time }}
									</option>
								</select>
							</div>
							<div>
								<select v-model="filterData.tripStatus.value" class="border outline-none w-full border-gray-600 px-3 py-2.5 rounded-md">
									<option v-for="(item, idx) in tripType" :key="idx" :value="item.value">
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template #item="{ item }">
				<div v-if="item.status" class="w-[100px]">
					<div v-if="!item?.data?.trip">
						<span class="bg-yellow-500 text-white text-[10px] rounded-full px-3 py-1">Upcoming Trip</span>
					</div>
					<div v-if="item?.data?.trip">
						<span
							v-if="!item?.data?.trip?.end_trip"
							class="bg-black text-white text-[10px] rounded-full px-3 py-1"
						>Active Trip</span
						>
						<span
							v-if="item?.data?.trip?.end_trip"
							class="bg-shuttlersGreen text-white text-[10px] rounded-full px-3 py-1"
						>Completed Trip</span
						>
					</div>
				</div>
				<div v-if="item?.created_at">
					{{ moment.utc(item.data.created_at).format('Do MMMM, YYYY') }}
				</div>
				<div v-if="item?.cost_of_supply">
					<span>{{ item.data.cost_of_supply ?? 'N/A' }}</span>
				</div>
				<div v-if="item.id">
					<button class="text-white bg-black text-xs px-3 py-2 rounded-lg" @click="navigateToTrip(item)">
						View Trip
					</button>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useAlert } from '@/composables/core/notification'
import { useItineraries } from '@/composables/modules/routes/itineraries'
import { useRouteTrips } from '@/composables/modules/routes/id'

const { tripsList, loading, getRouteTrips, filterData, onFilterUpdate, page, total, prev, next, moveTo } = useRouteTrips()
const { loading_single_iti, itineraries, singleItinerary, getItineraries } = useItineraries()
getItineraries()
getRouteTrips()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const computedRoutesTrips = computed(() => {
	if (!tripsList.value.length) return []
	return tripsList.value.map((item) => {
		return {
			...item,
            route_code: item?.route?.route_code || 'N/A',
			itinerary: item?.itinerary.trip_time || 'N/A',
            vehicle: item.vehicle ? `${item.vehicle.brand} ${item.vehicle.type}` : 'N/A',
			partner: item?.vehicle?.partner_id || 'N/A',
			driver: item.driver ? `${item.driver.fname} ${item.driver.lname} ${item.driver.phone}` : item.route.driver ? `${item.route.driver.fname} ${item.route.driver.lname} ${item.route.driver.phone}` : 'N/A',
			status: item.id
        }
	})
})
const tableFields = ref([
    {
        text: 'DATE',
        value: 'created_at'
    },
    {
        text: 'ROUTE CODE',
        value: 'route_code'
    },
    {
        text: 'ITINERARY',
        value: 'itinerary'
    },
    {
        text: 'STATUS',
        value: 'status'
    },
    {
        text: 'VEHICLE',
        value: 'vehicle'
    },
    {
        text: 'PARTNER',
        value: 'partner'
    },
    {
        text: 'DRIVER',
        value: 'driver'
    },
	{
        text: 'COST OF SUPPLY',
        value: 'cost_of_supply'
    },
	{
        text: 'ACTIONS',
        value: 'id'
    }
])

const tripType = reactive([
	{
		name: 'All Trips',
		value: 'all_trips'
	},
	{
		name: 'Active Trips',
		value: 'active'
	},
	{
		name: 'Upcoming Trips',
		value: 'upcoming'
	},
	{
		name: 'Completed Trips',
		value: 'completed'
	}
])

const selectedTrip = ref('')
const selectedItineraries = ref('')

const navigateToTrip = (itm) => {
	if (!itm.data.trip_id) {
		useAlert().openAlert({ type: 'ERROR', msg: 'The ID to the trip you are about to view is not available' })
	} else {
		useRouter().push(`/trips/type/upcoming/${itm.data.trip_id}/trip-details`)
	}
}

</script>

<style scoped></style>
