<template>
	<main class="">
		<Table :loading="loadingActiveTrips" :headers="tableFields" :table-data="formattedActiveTripsList" :has-options="true" :option="(data)=>$router.push(`/trips/type/active/${data.id}/trip-details`)">
			<template #header>
				<section class="flex flex-col gap-4 z-50">
					<TableTripFilter @filter="onFilterUpdate" />
					<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDateRange:true }" @filter="onFilterUpdate" @download="downloadReport" />
				</section>
			</template>
			<template #item="{ item }">
				<span v-if="item.idx">
					{{ item.data.idx }}
				</span>
				<div v-if="item.passengers" class="flex items-center gap-x-2 flex-col justify-center gap--y-2">
					<p>{{ item.data.passengers }}</p>
					<button class="bg-white text-shuttlersGreen border px-2 border-shuttlersGreen rounded-full" @click.stop="router.push(`/trips/type/active/${item.data.id}/passengers`)">
						View
					</button>
				</div>
				<span v-if="item.driver" class="text-blue-500 flex gap-1 flex-wrap">
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
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.destination" />
				</div>
				<div v-if="item.action" class="w-20">
					<button style="backgroundColor: #ff4500" class="text-white border px-2 py-1.5 rounded-lg" @click.stop="handleTripCancellation(item.data)">
						End Trip
					</button>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingActiveTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch'
import { useTripOptions } from '@/composables/modules/trips/options'

const { initializeEndTrips } = useTripOptions()
const { getActiveTrips, loadingActiveTrips, activeTripsList, onFilterUpdate, moveTo, total, page, next, prev, downloadReport } = useGetActiveTripsList()
getActiveTrips()
const formattedActiveTripsList = computed(() =>
 activeTripsList.value.map((i:any, index) => {
         return {
             ...i,
             route_code: `${i?.route?.route_code} (${useDateFormat(i?.start_trip, 'h:mm A').value})`,
			 pickup: i?.route?.pickup,
			 destination: i?.route?.destination,
			 partner: i?.partner ?? 'N/A',
             vehicle: `${i?.vehicle?.brand} ${i?.vehicle?.name}  (${i?.vehicle?.registration_number})`,
			 passengers: `${i?.passengers_count}/${i?.vehicle.seats}`,
             action: '',
			 trip_date: useDateFormat(i.trip_start_time, 'YYYY-MM-DD').value,
			 idx: index + 1
         }
    })
)

const handleTripCancellation = (data) => {
	initializeEndTrips(data)
}
const router = useRouter()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
	{
		text: 'S/N',
		value: 'idx',
		width: '10%'
	},
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
