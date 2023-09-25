<template>
	<main class="">
		<Table :loading="loadingActiveTrips" :headers="tableFields" :table-data="formattedActiveTripsList" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.id">
					{{ item.data.id }}
				</span>
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.destination" />
				</div>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingActiveTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useTripIdDetails } from '@/composables/modules/trips/id'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch'

const { getActiveTrips, loadingActiveTrips, activeTripsList, filterData, onFilterUpdate, moveTo, total, page, next, prev } = useGetActiveTripsList()
getActiveTrips()

const onRowClicked = (data) => {
	const { selectedTrip } = useTripIdDetails()
	useRouter().push(`/trips/type/completed/${data.id}/trip-details`)
	selectedTrip.value = data
}

const formattedActiveTripsList = computed(() =>
activeTripsList.value.map((i, index) => {
         return {
             ...i,
             route_code: `${i?.route?.route_code} (${i?.itinerary?.trip_time})`,
			 pickup: i?.route?.pickup,
			 dropoff: i?.route?.destination,
			 partner: i?.partner ?? 'N/A',
             vehicle: `${i?.vehicle?.brand} ${i?.vehicle?.name}  (${i?.vehicle?.registration_number})`,
			 driver: `${i?.driver?.fname} ${i?.driver?.lname}  (${i?.driver?.phone})`,
			 passengers: `${i?.passengers_count}/${i?.vehicle.seats}`,
             action: '',
			 id: index + 1
         }
    })
)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Start Trip', func: (data) => { useRouter().push(`/fleets/${data.user_id}/past-bookings/${data.trip_id}`) } },
	{ name: 'Cancel Trip', func: (data) => setDeleteRefundId(data.id), class: '!text-red' },
	{ name: 'Complete Trip', func: (data) => setDeleteRefundId(data.id), class: '!text-red' }
])

const tableFields = ref([
	{
		text: 'S/N',
		value: 'id',
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
