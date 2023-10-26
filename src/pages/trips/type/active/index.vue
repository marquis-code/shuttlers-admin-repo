<template>
	<main class="">
		<Table :loading="loadingActiveTrips" :headers="tableFields" :table-data="formattedActiveTripsList" :has-options="true" :option="(data)=>useRouter().push(`/trips/type/active/${data.id}/trip-details`)">
			<template #header>
				<section class="flex flex-col gap-4 z-50">
					<TableTripFilter @filter="onFilterUpdate" />
					<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDateRange:true }" @filter="onFilterUpdate" />
				</section>
			</template>
			<template #item="{ item }">
				<span v-if="item.idx">
					{{ item.data.idx }}
				</span>
				<div v-if="item.passengers" class="flex items-center gap-x-2 flex-col justify-center gap--y-2">
					<p>{{ item.data.passengers }}</p>
					<button class="bg-white text-shuttlersGreen border px-2 border-shuttlersGreen rounded-full" @click.stop="navigateToRoutePassengers(item.data)">
						View
					</button>
				</div>
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.destination" />
				</div>
				<div v-if="item.action" class="w-20">
					<button style="backgroundColor: #ff4500" class="text-white border px-2 py-1.5 rounded-lg" @click.stop="handleTripCancellation">
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
import { useTripIdDetails } from '@/composables/modules/trips/id'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
const { call_functuon, closeAlert, description, title, loading, type } = useConfirmationModal()
const router = useRouter()

const { getActiveTrips, loadingActiveTrips, activeTripsList, filterData, onFilterUpdate, moveTo, total, page, next, prev } = useGetActiveTripsList()
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
			 driver: `${i?.driver?.fname} ${i?.driver?.lname}  (${i?.driver?.phone})`,
			 passengers: `${i?.passengers_count}/${i?.vehicle.seats}`,
             action: '',
			 trip_date: useDateFormat(i.trip_start_time, 'YYYY-MM-DD').value,
			 idx: index + 1
         }
    })
)

const handleTripCancellation = () => {
	// useConfirmationModal().openAlert({ alert('Hello world'), closeAlert, description: 'BLA BAL BA;', title: 'B;a', loading, type: 'SUCCESS' })
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Start Trip', func: (data) => { useRouter().push(`/fleets/${data.user_id}/past-bookings/${data.trip_id}`) } },
	{ name: 'Cancel Trip', func: (data) => {}, class: '!text-red' },
	{ name: 'Complete Trip', func: (data) => {}, class: '!text-red' }
])

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

const navigateToRoutePassengers = (item) => {
	router.push(`/trips/type/active/${item.id}/passengers`)
}
</script>

<style scoped></style>
