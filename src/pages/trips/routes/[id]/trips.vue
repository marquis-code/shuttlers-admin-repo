<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="computedRoutesTrips" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true, showDateRange: true}" @filter="onFilterUpdate" />
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
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useRouteTrips } from '@/composables/modules/routes/id'

const { tripsList, loading, getRouteTrips, filterData, onFilterUpdate, page, total, prev, next, moveTo } = useRouteTrips()
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
			driver: item.driver ? `${item.driver.fname} ${item.driver.lname}` : item.route.driver ? `${item.route.driver.fname} ${item.route.driver.lname}` : 'N/A',
			cost_of_supply: item?.trip?.cost_of_supply || 'N/A',
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
        value: ''
    }
])

</script>

<style scoped></style>
