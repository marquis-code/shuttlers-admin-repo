<template>
	<main class="">
		<Table :loading="loadingUpcomingTrips" :headers="tableFields" :table-data="formattedUpcomingTripsList" :has-options="true" :option="(data)=>$router.push(`/trips/type/upcoming/${data.id}/trip-details`)">
			<template #header>
				<section class="flex flex-col gap-4 z-50">
					<TableTripFilter @filter="onFilterUpdate" />
					<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDateRange:true }" @filter="onFilterUpdate" />
				</section>
			</template>
			<template #item="{ item }">
				<span v-if="item.driver" class="text-blue-500 flex gap-1 flex-wrap" @click.stop>
					<NuxtLink :to="`/drivers/${item.data.driver.id}/driver-info`" class="">
						{{
							item.data.driver
								? `${item.data.driver.fname} ${item.data.driver.lname}`
								: item.data.route.driver
									? `${item.data.route.driver.fname} ${item.data.route.driver.lname}`
									: 'N/A'
						}}
					</NuxtLink>
					<span v-if="item.data.driver && item.data.driver.phone">
						<a :href="'tel:' + item.data.driver.phone">{{ item.data.driver
							? item.data.driver.phone.replace(/^0/, '+234') : 'N/A' }}</a>
					</span>
				</span>
				<span v-if="item.route_code" @click.stop>
					<NuxtLink :to="`/trips/routes/${item.data.route.id}/details`" class="text-blue-500">{{ item?.data?.route_code }}</NuxtLink> <span>({{ item?.data?.trip_time }})</span>
				</span>
				<div v-if="item.passengers" class="flex items-center gap-x-2 flex-col justify-center gap--y-2">
					<p>{{ item.data.passengers }}</p>
					<button class="bg-white text-shuttlersGreen border px-2 border-shuttlersGreen rounded-full">
						View
					</button>
				</div>
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.dropoff" />
				</div>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren(item.data)" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingUpcomingTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch'
import { useTripOptions } from '@/composables/modules/trips/options'
import { dayIsInThePast } from '@/composables/utils/formatter'

const { getUpcomingTrips, loadingUpcomingTrips, upcomingTripsList, filterData, onFilterUpdate, moveTo, total, page, next, prev } = useGetUpcomingTripsList()
getUpcomingTrips()

const { initializeStartTrips, initializeCancelTrips, initializeCompleteTrips } = useTripOptions()

const formattedUpcomingTripsList = computed(() =>
upcomingTripsList.value.map((i:any, index) => {
         return {
             ...i,
             route_code: i?.route?.route_code ?? 'N/A',
			 trip_time: i?.itinerary?.trip_time ?? 'N/A',
			 pickup: i?.route?.pickup ?? 'N/A',
			 dropoff: i?.route?.destination ?? 'N/A',
			 partner: i?.vehicle?.partner?.company_name ?? 'N/A',
             vehicle: `${i?.vehicle?.brand} ${i?.vehicle?.name}  (${i?.vehicle?.registration_number})`,
			 passengers: `${i?.passengers_count}/${i?.vehicle.seats}`,
             action: ''
         }
    })
)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = (main_data) => {
 const dropdownOptions = [
        { name: 'Start Trip', func: (data) => initializeStartTrips(data) },
        { name: 'Cancel Trip', func: (data) => initializeCancelTrips(data), class: '!text-red' }
    ]
    if (dayIsInThePast(main_data.trip_date)) {
        dropdownOptions.push({ name: 'Complete Trip', func: (data) => initializeCompleteTrips(data) })
    }
    return dropdownOptions
}

const tableFields = ref([
    {
        text: 'TRIP DATE',
        value: 'trip_date'
    },
    {
        text: 'ROUTE CODE ( START TIME)',
        value: 'route_code'
    },
    {
        text: 'ROUTE',
        value: 'route'
    },
    {
        text: 'PARTNER\'S NAME',
        value: 'partner'
    },
    {
        text: 'VEHICLE NAME',
        value: 'vehicle'
    },
	{
        text: 'DRIVER',
        value: 'driver'
    },
	{
        text: 'PASSENGERS',
        value: 'passengers'
    },
	{
		text: 'ACTIONS',
		value: 'action'
	}
])

</script>

<style scoped></style>
