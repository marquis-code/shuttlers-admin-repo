<template>
	<main class="">
		<Table :loading="loadingAutions" :has-index="true" :page="page" :headers="tableFields" :table-data="routeAutionList" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDateRange: true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.pickup">
					<RouteDescription :pickup="item?.data?.pickup" :destination="item?.data?.destination" />
				</div>
				<div v-if="item.itinerary_time" class="">
					<span class="text-indigo-400">{{ item.data.route_code }}</span><br>
					<span>{{ item.data.itinerary_time }}</span>
				</div>
				<div v-if="item.bid_status">
					<span class="text-black border-shuttlersGreen border rounded-md px-3 py-2">{{ item.data.bid_status }}</span>
				</div>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const loadingAutions = ref(false)
const page = ref(1)

const onRowClicked = (data) => {
    useRouter().push(`/trips/routes/${1159}/itineraries/${2}/auction-details`)
}

const tableFields = ref([
    {
        text: 'ROUTE',
        value: 'pickup'
    },
    {
        text: 'ITINERARY',
        value: 'itinerary_time'
    },
	{
        text: 'TRIP START DATE',
        value: 'trip_date'
    },
	{
        text: 'PREFERRED VEHICLE',
        value: 'preferred_vehicle'
    },
	{
		text: 'BID START DATE',
		value: 'bid_start_date'
	},
    {
        text: 'BID STATUS',
        value: 'bid_status'
    },
    {
        text: 'WINNING BID',
        value: 'winning_bid'
    }
])

const routeAutionList = ref([
    {
        pickup: 'Alaka busstop',
        destination: 'Iponri costain',
        trip_date: '2023-10-25',
        preferred_vehicle: 'Toyota Camry 2020',
        bid_start_date: '2023-10-25',
        bid_status: 'ongoing',
        winning_bid: '-------',
        itinerary_time: '5:00 AM',
        route_code: 'SGT253'
    },
    {
        pickup: 'Alaka busstop',
        destination: 'Iponri costain',
        trip_date: '2023-10-25',
        preferred_vehicle: 'Toyota Camry 2020',
        bid_start_date: '2023-10-25',
        bid_status: 'ongoing',
        winning_bid: '-------',
        itinerary_time: '5:00 AM',
        route_code: 'SGT253'
    }
])
</script>

<style scoped></style>
