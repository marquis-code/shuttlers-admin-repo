<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="driversList" :checkbox="filterData.status.value === 'active'"
			:has-options="true" :selected="selected_drivers" :option="onRowClicked" @checked="selected_drivers = ($event)"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showStatus:true,
						showSearchBar:true,
						showDownloadButton: true,
						showDatePicker: false,
						showDateRange: true
					}"
					@download="downloadReport"
					@filter="onFilterUpdate">
					<template #filter_others>
						<button v-if="selected_drivers.length" class="p-2 px-3 bg-dark text-light text-sm rounded-md" @click="initDeactivate">
							Deactivate
						</button>
					</template>
				</TableFilter>
			</template>
			<template #item="{ item }">
				<div v-if="item.fname" class="space-y-1 text-blue-600 py-2">
					<span class="block">{{ item.data.fname }} {{ item.data.lname }}</span>
					<span class="block">{{ item.data.email }}</span>
					<span class="block">{{ item.data.phone }}</span>
				</div>
				<span v-if="item.rating" class="flex items-center gap-4">
					<div class="flex items-center gap-1">
						<StarRating :rating="item.data.average ?? 0" />
						<p>{{ item.data?.average || 0 }} ({{ item.data?.trip_count || 0 }} trips)</p>
					</div>
				</span>
				<span v-if="item.avatar" class="flex items-center gap-4">
					<Avatar :src="item.data?.avatar" :name="item.data?.fname" bg="#B1C2D9" />
				</span>
				<span v-if="item.created_at">
					{{ moment(item.data.created_at).format('ll') }}
				</span>
				<span v-else-if="item.active">
					<StatusBadge :name="item.data.active === '1' ? 'active' : 'inactive'" />
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
import { useGetDriversList, useDriverIdDetails, useDeactivateDriver } from '@/composables/modules/drivers'

const { getDriversList, loading, driversList, filterData, onFilterUpdate, moveTo, next, prev, total, page, downloadReport } = useGetDriversList()
const { loading: deactivating, selected_drivers, initDeactivate } = useDeactivateDriver()

getDriversList()
const onRowClicked = (data) => {
	const { selectedDriver } = useDriverIdDetails()
	useRouter().push(`/drivers/${data.id}/driver-info`)
	selectedDriver.value = data
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'User',
        value: 'fname'
    },
    {
        text: 'Average Rating',
        value: 'rating'
    },
    {
        text: 'Avatar',
        value: 'avatar'
    },
    {
        text: 'Date Joined',
        value: 'created_at'
    },
    {
        text: 'STATUS',
        value: 'active'
    }
])
selected_drivers.value = []
</script>
