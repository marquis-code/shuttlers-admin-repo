<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading" :has-index="true" :page="page" :headers="tableFields" :table-data="batchBookingList" :option="onRowClicked" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{showStatus:false}" />
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
				<span v-if="item.processing_completed_at" class="text-xs rounded-lg text-white" :class="[item.data.processing_completed_at ? '!bg-green px-3 py-1' : '!bg-red px-3 py-1']">
					{{ item.data.processing_completed_at ? "processed" : "pending" }}
				</span>
				<span v-else-if="item.created_at">
					{{ moment.utc(item.data.created_at).format('ll, hh:mm:ss A') }}
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDateFormat } from '@vueuse/core'
import { useGetBatchBookingList } from '@/composables/modules/batchBooking/fetch'
import { useBatchBookingIdDetails } from '@/composables/modules/batchBooking/id'

const { getBatchBookingList, loading, batchBookingList, moveTo, next, prev, total, page } = useGetBatchBookingList()
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
        value: 'processing_completed_at'
    },
    {
        text: 'CREATED AT',
        value: 'created_at'
    }
])

</script>

<style scoped></style>
