<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="driversList" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :selected="log_ids" :checkbox="true" @filter="onFilterUpdate" @checked="log_ids = ($event)" />
			</template>
			<template #item="{ item }">
				<div v-if="item.fname" class="space-y-1 text-blue-600 py-2">
					<span class="block">{{ item.data.fname }} {{ item.data.lname }}</span>
					<span class="block">{{ item.data.email }}</span>
					<span class="block">{{ item.data.phone }}</span>
				</div>
				<span v-if="item.rating" class="flex items-center gap-4">
					<span>{{ item.data.rating ?? 'N/A' }}</span>
				</span>
				<span v-if="item.avatar" class="flex items-center gap-4">
					<Avatar :name="item.data.fname" bg="#B1C2D9" />
				</span>
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
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
import { useDateFormat } from '@vueuse/core'
import { useGetDriversList } from '@/composables/modules/drivers/fetch'
import { useDriverIdDetails } from '@/composables/modules/drivers/id'

const { getDriversList, loading, driversList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetDriversList()

filterData.status.value = useRoute().query.status === '1' ? 'active' : 'inactive'
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

</script>
