<template>
	<main class="">
		<Table :loading="loadingUpcomingTrips" :headers="tableFields" :table-data="formattedUpcomingTripsList"  :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<span v-if="item.id">
					{{ item.data.id }}
				</span>
				<span v-if="item.driver">
					<NuxtLink to="/" class="text-blue-500 font-medium">{{ item.data.driver }}</NuxtLink>
				</span>
				<span v-if="item.route_code">
					<NuxtLink to="/" class="text-blue-500 font-medium">{{ item?.data?.route_code }}</NuxtLink> <span>({{ item?.data?.trip_time }})</span>
				</span>
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.dropoff" />
				</div>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
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
import { useTripIdDetails } from '@/composables/modules/trips/id'

const { getUpcomingTrips, loadingUpcomingTrips, upcomingTripsList, filterData, onFilterUpdate, moveTo, total, page, next, prev } = useGetUpcomingTripsList()
getUpcomingTrips()

const onRowClicked = (data) => {
	const { selectedTrip } = useTripIdDetails()
	useRouter().push(`/trips/type/upcoming/${data.id}/trip-details`)
	selectedTrip.value = data
}

const formattedUpcomingTripsList = computed(() =>
upcomingTripsList.value.map((i, index) => {
         return {
             ...i,
             route_code: i?.route?.route_code ?? 'N/A',
			 trip_time: i?.itinerary?.trip_time ?? 'N/A',
			 pickup: i?.route?.pickup ?? 'N/A',
			 dropoff: i?.route?.destination ?? 'N/A',
			 partner: i?.vehicle?.partner?.company_name ?? 'N/A',
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
