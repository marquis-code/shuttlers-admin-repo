<template>
	<main>
		<Table :loading="loading" :headers="tableFields" :page="page" :has-index="true" :table-data="formattedBookingList" class="cursor-pointer" :option="(data)=>$router.push(`/users/${id}/cancelled-trips/${data.id}`)">
			<template #header>
				<TableFilter :filter-type="{ showSearchBar:true, showDateRange: true }" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.route.pickup" :destination="item.data.route.destination" />
				</div>
				<div v-if="item.amount">
					<span> {{ convertToCurrency(item?.data?.amount) }}</span>
				</div>

				<div v-if="item.start_date">
					<span> {{ item?.data?.start_date }} {{ item?.data?.trip_date ?? 'N/A' }} </span>
				</div>
				<div v-if="item.end_date">
					<span> {{ item?.data?.end_date }}</span>
				</div>
				<div v-if="item.route_type">
					<span>
						{{ item?.data?.route_type }}
					</span>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { convertToCurrency } from '@/composables/utils/formatter'
import { useUserBookings } from '@/composables/modules/users/id'
const { getBookings, loading, bookings, filterData, onFilterUpdate, next, prev, moveTo, page, total, setBookingType, bookingType } = useUserBookings()
bookingType.value = 'cancelled'
getBookings()
const id = useRoute().params.id
const formattedBookingList = computed(() => {
	if (!bookings.value.length) return []
	return bookings.value.map((item, index) => {
		return {
			...item,
			route_code: item?.route?.route_code ?? 'N/A',
			start_date: item?.itinerary?.trip_time ?? 'N/A',
			date_cancelled: item?.updated_at ? moment(item?.updated_at).format('ll') : 'N/A',
			amount: item?.unit_cost ?? 'N/A',
			payment_source: `${item?.payment_source} ${item?.instant_payment_provider === 'paystack' ? '' : (item?.instant_payment_provider)}`,
		    route_type: `${item?.route?.visibility} ${item?.route?.is_exclusive ? 'exclusive' : 'shared'}`
	    }
	})
})

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
        text: 'DATE CANCELLED',
        value: 'date_cancelled'
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
