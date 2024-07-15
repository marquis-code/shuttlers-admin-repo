<template>
	<main class="">
		<Table :loading="loadingUpcomingTrips" :headers="tableFields" :table-data="formattedUpcomingTripsList" :has-index="true" :page="page" :has-options="true" :option="onRowClicked">
			<template #header>
				<section class="flex flex-col gap-4 z-50">
					<TableTripFilter @filter="onFilterUpdate" />
					<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showDateRange:true }" @filter="onFilterUpdate" @download="downloadTrips" />
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
				<div v-if="item?.route_type" class="flex flex-col gap-0 text-sm font-medium">
					<p :class="item?.data?.route?.is_exclusive ? 'text-purp7' : 'text-yellow01'">
						{{ item?.data?.route?.is_exclusive ? 'Exclusive' : 'Shared' }}
					</p>
					<p class="capitalize">
						{{ item?.data?.route?.visibility }}
					</p>
					<p v-if="item?.data?.route?.is_zero_booked_shared_route" class="whitespace-nowrap text-green7">
						Zero-booking
					</p>
				</div>
				<div v-if="item.passengers" class="flex items-center gap-x-2 flex-col justify-center gap--y-2">
					<p>{{ item.data.passengers }}</p>
					<button class="bg-white text-shuttlersGreen border px-2 border-shuttlersGreen rounded-full" @click.stop="router.push(`/trips/type/upcoming/${item.data.id}/passengers`)">
						View
					</button>
				</div>
				<div v-if="item.route" @click.stop>
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.dropoff" />
				</div>
				<p v-if="item.vehicle" class="min-w-[100px]">
					{{ item.data.vehicle }} <br>
					{{ item.data?.cost_of_supply ? convertToCurrency(item.data?.cost_of_supply) : 'N/A' }}
				</p>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren(item.data)" :index="item.index" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingUpcomingTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch/upcomingTrips'
import { useTripOptions } from '@/composables/modules/trips/options'
import { dayIsInThePast, convertToCurrency } from '@/composables/utils/formatter'
import { useCreateIssues } from '@/composables/modules/trips/issues'
import { useCompletedTripIdDetails } from '@/composables/modules/trips/id'
import { isProdEnv } from '@/composables/utils/system'
import { useDownloadTrips } from '@/composables/modules/trips/fetch'

const { downloadTrips } = useDownloadTrips()
const { getUpcomingTrips, loadingUpcomingTrips, upcomingTripsList, onFilterUpdate, moveTo, total, page, next, prev } = useGetUpcomingTripsList()
const { selectedTrip } = useCompletedTripIdDetails()
getUpcomingTrips()

const { initializeStartTrips, initializeCancelTrips, initializeCompleteTrips, initializeTripUpdate } = useTripOptions()
const { initLogIssues } = useCreateIssues()
const router = useRouter()
const formattedUpcomingTripsList = computed(() =>
upcomingTripsList.value.map((i:any, index) => {
         return {
             ...i,
             route_code: i?.route?.route_code ?? 'N/A',
			//  trip_time: i?.itinerary?.trip_time ?? 'N/A',
			trip_time: i?.route?.itineraries![0]?.trip_time ?? 'N/A',
			 pickup: i?.route?.pickup ?? 'N/A',
			 dropoff: i?.route?.destination ?? 'N/A',
			 partner: i?.vehicle?.partner?.company_name ? `${i?.vehicle?.partner?.company_name} (${i?.vehicle?.partner?.company_phone})` : 'N/A',
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

const onRowClicked = (data: any) => {
	useRouter().push(`/trips/type/upcoming/${data.id}/trip-details`)
	selectedTrip.value = data
}

const dropdownChildren = (main_data) => {
 const dropdownOptions = [
        { name: 'Start Trip', func: (data) => initializeStartTrips(data) },
        { name: 'Update Trip', func: (data) => initializeTripUpdate(data, 'upcoming') },
		{ name: 'Log Issue', func: (data) => initLogIssues(data), hide: isProdEnv.value },
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
        text: 'ROUTE TYPE',
        value: 'route_type'
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
        text: 'VEHICLE NAME - COST OF SUPPLY',
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
