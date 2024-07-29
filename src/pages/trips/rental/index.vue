<template>
	<main class="">
		<Table :loading="loadingRental" :headers="tableFields" :table-data="rentalList" :has-index="true" :page="page" :has-options="true" :option="(data)=> $router.push(`/trips/rental/${data.id}`)">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange: true, showDownloadButton: true}" @download="handleDownload" @filter="onFilterUpdate" />
				<div class="bg-white border-x border-gray-200">
					<div class="flex justify-end items-end p-3 gap-4">
						<div class="flex items-center gap-x-2">
							<label class="font-medium text-base my-0">
								Status:
							</label>
							<select v-model="filterData.status.value" class="input-field w-36">
								<option value="">
									Select Status
								</option>
								<option v-for="status in [
									{ name: 'Pending', value: 'pending' },
									{ name: 'Accepted', value: 'accepted' },
									{ name: 'Rejected', value: 'rejected' },
									{ name: 'Cancelled', value: 'cancelled' }
								]" :key="status.value" :value="status.value">
									{{ status.name }}
								</option>
							</select>
						</div>
						<div class="flex items-center gap-x-2">
							<label class="font-medium text-base my-0">
								Booking Status:
							</label>
							<select v-model="filterData.booking_status.value" class="input-field w-36">
								<option value="">
									Select Booking Status
								</option>
								<option v-for="status in [
									{ name: 'Pending', value: 'pending' },
									{ name: 'Active', value: 'active' },
									{ name: 'Cancelled', value: 'cancelled' },
									{ name: 'Completed', value: 'completed' },
									{ name: 'Expired', value: 'expired' },
									{ name: 'Pending Cancellation', value: 'pending_cancellation' }
								]" :key="status.value" :value="status.value">
									{{ status.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</template>
			<template #item="{ item }">
				<div v-if="item.pickup_address">
					<RouteDescription :pickup="item.data.pickup_address" :destination="item.data.return_address" />
				</div>
				<div v-if="item.return_date">
					{{ item.data.return_date ? 'Round Trip' : 'One Way' }}
				</div>
				<div v-if="item.vehicle_orders">
					{{ item.data.vehicle_orders.length }}
				</div>
				<div v-if="item.user">
					{{ item.data.user.fname }} {{ item.data.user.lname }}
				</div>
				<div v-if="item.updated_at">
					{{ item.data.user.phone }}
				</div>

				<span v-else-if="item.userRoute">
					<StatusBadge :name=" item.data?.userRoute?.booking_status || 'false'" />
				</span>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM DD, YYYY, HH:MM A").value }}
				</span>
				<span v-else-if="item.status" class="flex">
					<StatusBadge :name="item.data.status" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingRental" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useDownloadReport } from '@/composables/utils/csv'

import { useGetRentalList } from '@/composables/modules/Rentals/fetch'
const { download, loading } = useDownloadReport()

const { getRentalList, loadingRental, onFilterUpdate, rentalList, page, moveTo, next, prev, total, filterData } = useGetRentalList()

getRentalList()

const handleDownload = () => {
 loading.value = true
 download(rentalList.value, 'Rentals report')
}
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'DATE CREATED',
        value: 'created_at'
    },
    {
        text: 'PICKUP & DESTINATION',
        value: 'pickup_address'
    },
    {
        text: 'TRIP TYPE',
        value: 'return_date'
    },
    {
        text: 'NUMBER OF VEHICLES',
        value: 'vehicle_orders'
    },
    {
        text: 'CUSTOMER NAME',
        value: 'user'
    },
	{
        text: 'PHONE NUMBER',
        value: 'updated_at'
    },
    {
        text: 'TRIPS DATE',
        value: 'pickup_date'
    },
    {
        text: 'PAYMENT STATUS',
        value: 'userRoute'
    },
    {
        text: 'STATUS',
        value: 'status'
    }
])

</script>

<style scoped></style>
