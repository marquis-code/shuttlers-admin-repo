<template>
	<main class="">
		<Table :loading="loadingCompletedTrips" :headers="tableFields" :table-data="formattedCompletedTripsList">
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
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingCompletedTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetCompletedTripsList } from '@/composables/modules/trips/fetch'

const { getCompletedTrips, loadingCompletedTrips, completedTripsList, filterData, moveTo, total, page, next, prev } = useGetCompletedTripsList()
getCompletedTrips()

const formattedCompletedTripsList = computed(() =>
completedTripsList.value.map((i, index) => {
         return {
             ...i,
             route_code: i?.route?.route_code ?? 'N/A',
			 created_at: useDateFormat(i.trip_start_time, 'MMMM d, YYYY').value ?? 'N/A',
			 trip_time: i?.route_itinerary?.trip_time ?? 'N/A',
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
	{ name: 'View Financials', func: (data) => { useRouter().push(`/fleets/${data.user_id}/past-bookings/${data.trip_id}`) } }
])

const tableFields = ref([
	{
		text: 'S/N',
		value: 'id',
		width: '10%'
	},
    {
        text: 'TRIP DATE',
        value: 'created_at'
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
