<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="bookings" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.route.pickup" :destination="item.data.route.destination" />
				</div>
				<div v-if="item.amount">
					<span> {{ convertToCurrency(item?.data?.cost) }}</span>
				</div>
				<p v-if="item.route_code">
					{{ item.data?.route?.route_code || 'N/A' }}
				</p>

				<p v-if="item.start_date" class="whitespace-nowrap">
					<span> {{ item.data.start_date ?? 'N/A' }}</span>
				</p>
				<p v-if="item.end_date" class="whitespace-nowrap">
					<span> {{ item.data.end_date ?? 'N/A' }}</span>
				</p>
				<div v-if="item.route_type">
					<span> {{ item?.data?.route?.visibility }} </span>
					<br>
					<span> {{ item?.data?.route?.is_exclusive ? "Exclusive" : "Shared" }} </span>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
import { useUserBookings } from '@/composables/modules/users/id'

const userId = useRoute().params.id as string
const { getBookings, loading, bookings, filterData, onFilterUpdate, next, prev, moveTo, page, total, setBookingType, bookingType } = useUserBookings()
bookingType.value = 'active'
getBookings()

const onRowClicked = (data) => {
	useRouter().push(`/users/${userId}/booking-ticket/${data.id}`)
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'ROUTE',
        value: 'route'
    },
    {
        text: 'Route Code',
        value: 'route_code'
    },
    {
        text: 'START DATE',
        value: 'start_date'
    },
    {
        text: 'END DATE',
        value: 'end_date'
    },
    {
        text: 'Amount',
        value: 'amount'
    },
	{
        text: 'PAYMENT SOURCE',
        value: 'payment_source'
    },
    {
        text: 'ROUTE TYPE',
        value: 'route_type'
    }
])

</script>

<style scoped></style>
