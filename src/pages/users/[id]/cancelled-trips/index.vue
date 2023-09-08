<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="pastBookingsList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.route.pickup" :destination="item.data.route.destination" />
				</div>
				<div v-if="item.amount">
					<span>₦ {{ convertToCurrency(item?.data?.amount) }}</span>
				</div>

				<div v-if="item.start_date">
					<span> {{ item.data.start_date ?? 'N/A' }}</span>
				</div>
				<div v-if="item.end_date">
					<span> {{ item.data.end_date ?? 'N/A' }}</span>
				</div>
				<div v-if="item.route_type">
					<span>
						{{
							item?.data?.route_type?.visibility
						}}
					</span>
					<br>
					<span>
						{{
							item?.data?.route_type?.type ? "exclusive" : "shared"
						}}
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
import { useUserPastBookings } from '@/composables/modules/users/past-bookings'
const { pastBookingsList, loading, getUserPastBookingsById, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useUserPastBookings()
const id = useRoute().params.id as string

filterData.status.value = 'cancelled'

getUserPastBookingsById(id)

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
