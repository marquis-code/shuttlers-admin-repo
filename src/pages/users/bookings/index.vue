<template>
	<main class="">
		<Table :loading="loading" :has-index="true" :page="page" :headers="tableFields" :table-data="batchBookingList" :option="onRowClicked" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.pickup" class="flex items-center gap-4">
					<span>{{ item.data.pickup }}</span>
				</span>
				<span v-if="item.dropoff" class="flex items-center gap-4">
					<span>{{ item.data.dropoff }}</span>
				</span>
				<span v-if="item.routeCode" class="flex items-center gap-4">
					<span>{{ item.data.routeCode }}</span>
				</span>
				<span v-if="item.userCount" class="flex items-center gap-4">
					<span>{{ item.data.userCount }}</span>
				</span>
				<span v-if="item.status" class="text-white text-xs rounded-lg" :class="[item.data.status === 'processed' ? 'bg-green-500 px-3 py-1' : 'bg-red-500 px-3 py-1']">
					{{ item.data.status }}
				</span>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY, hh:mm:ss A").value }}
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetBatchBookingList } from '@/composables/modules/batchBooking/fetch'
import { useBatchBookingIdDetails } from '@/composables/modules/batchBooking/id'

const { getBatchBookingList, loading, batchBookingList, onFilterUpdate, moveTo, next, prev, total, page } = useGetBatchBookingList()
getBatchBookingList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const onRowClicked = (data) => {
	const { selectedBooking } = useBatchBookingIdDetails()
	useRouter().push(`/users/bookings/${data.id}/booking-info`)
	selectedBooking.value = data
}

const tableFields = ref([
    {
        text: 'PICKUP',
        value: 'pickup'
    },
    {
        text: 'DROPOFF',
        value: 'dropoff'
    },
    {
        text: 'ROUTE CODE',
        value: 'routeCode'
    },
    {
        text: 'USERS COUNT',
        value: 'userCount'
    },
    {
        text: 'STATUS',
        value: 'status'
    },
    {
        text: 'CREATED AT',
        value: 'created_at'
    }
])

</script>

<style scoped></style>
