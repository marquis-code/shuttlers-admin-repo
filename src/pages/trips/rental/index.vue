<template>
	<main class="">
		<Table :loading="loadingRental" :headers="tableFields" :table-data="rentalList" :has-index="true" :page="page" :has-options="true" :option="(data)=> $router.push(`/trips/rental/${data.id}`)">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true}" />
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

				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY, HH:MM A").value }}
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

import { useGetRentalList } from '@/composables/modules/Rentals/fetch'

const { getRentalList, loadingRental, rentalList, page, filterData, moveTo, next, prev, total } = useGetRentalList()

getRentalList()

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
        text: 'STATUS',
        value: 'status'
    }
])

</script>

<style scoped></style>
