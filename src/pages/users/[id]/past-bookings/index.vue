<template>
	<main class="">
		<ButtonGoBack url="/users" class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :page="page" :has-index="true" :table-data="formattedBookingList" :has-options="true" :option="(data)=>$router.push(`/users/${id}/past-bookings/${data.id}`)">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange: true}" @filter="onFilterUpdate" />
			</template>
			{{ bookings }}
			<template #item="{ item }">
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.route.pickup" :destination="item.data.route.destination" />
				</div>
				<div v-if="item.amount">
					<span> {{ convertToCurrency(item?.data?.amount) }}</span>
				</div>

				<p v-if="item.start_date" class="whitespace-nowrap">
					<span> {{ item?.data?.start_date }} <br> {{ item?.data?.trip_date ?? 'N/A' }} </span>
				</p>
				<p v-if="item.end_date" class="whitespace-nowrap">
					<span> {{ item?.data?.end_date }}</span>
				</p>
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
import { convertToCurrency } from '@/composables/utils/formatter'
import { useUserBookings } from '@/composables/modules/users/id'
const { getBookings, loading, bookings, onFilterUpdate, next, prev, moveTo, page, total, bookingType } = useUserBookings()
bookingType.value = 'completed'
getBookings()

const id = useRoute().params.id
const formattedBookingList = computed(() => {
	if (!bookings.value.length) return []
	return bookings.value.map((item, index) => {
		return {
			...item,
			route_code: item?.route?.route_code ?? 'N/A',
			start_date: item?.itinerary?.trip_time ?? 'N/A',
			end_date: item?.trip_date ?? 'N/A',
			amount: item?.unit_cost ?? 'N/A',
			payment_source: `${item?.payment_source} ${item?.instant_payment_provider === 'paystack' ? '' : (item?.instant_payment_provider)}`,
		    route_type: `${item?.route?.visibility} ${item?.route?.is_exclusive ? 'Exclusive' : 'Shared'}`
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
