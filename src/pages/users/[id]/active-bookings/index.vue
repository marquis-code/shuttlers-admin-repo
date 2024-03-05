<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="bookings" :has-options="true" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<div v-if="item.route">
					<RouteDescription @click="onRowClicked(item.data)" :pickup="item.data.route.pickup" :destination="item.data.route.destination" />
				</div>
				<div v-if="item.amount">
					<span @click="onRowClicked(item.data)"> {{ convertToCurrency(item?.data?.cost) ?? '₦ 0.00' }}</span>
				</div>
				<p v-if="item.route_code">
					<NuxtLink v-if="item.route_code" class="underline text-blue-700 font-semibold" :to="`/trips/routes/${item.data?.route?.id}/details`">
						{{ item.data?.route?.route_code || 'N/A' }}
					</NuxtLink>
					<span v-else>No route available</span>
				</p>

				<p v-if="item.start_date" class="whitespace-nowrap">
					<span @click="onRowClicked(item.data)"> {{ item?.data?.start_date ?? 'N/A' }}</span>
				</p>
				<p v-if="item.end_date" class="whitespace-nowrap">
					<span @click="onRowClicked(item.data)"> {{ item?.data?.end_date ?? 'N/A' }}</span>
				</p>
				<p v-if="item.payment_source" class="whitespace-nowrap">
					<span @click="onRowClicked(item.data)"> {{ item?.data?.payment_source === 'instant_payment' ? `${item?.data?.payment_source}(Corporate pay)` : item?.data?.payment_source }}</span>
				</p>
				<div v-if="item.route_type" @click="onRowClicked(item.data)">
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
