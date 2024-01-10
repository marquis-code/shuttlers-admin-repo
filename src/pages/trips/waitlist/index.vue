<template>
	<main class="">
		<Table :loading="loadingWaitlist" :headers="tableFields" :table-data="waitlistList" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showDownloadButton: true, showDateRange: true}" @filter="onFilterUpdate" />
				<div class="bg-white border-x border-gray-200">
					<div class="flex justify-end items-end pr-3 pb-2">
						<div class="flex items-center gap-x-2">
							<p class="font-medium text-sm">
								Sort:
							</p>
							<select v-model="filterData.sort.value" class="outline-none px-3 text-sm font-medium py-3 rounded-md border pr-6">
								<option value="" disabled>
									Sort by
								</option>
								<option value="ascending">
									Ascending
								</option>
								<option value="descending">
									Descending
								</option>
							</select>
						</div>
					</div>
				</div>
			</template>
			<template #item="{ item }">
				<span v-if="item.date">
					{{ useDateFormat(item.data.date, "MMMM d, YYYY, HH:MM A").value }}
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingWaitlist" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetwaitlistList } from '@/composables/modules/waitlist/fetch'
import { useWaitlistIdDetails } from '@/composables/modules/waitlist/id'

const {
 getWaitlist, loadingWaitlist, waitlistList, next, filterData,
    prev, page, total, moveTo, onFilterUpdate
} = useGetwaitlistList()
getWaitlist()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const onRowClicked = (data) => {
	const { selectedWaitlistObject } = useWaitlistIdDetails()
	selectedWaitlistObject.value = data
	useRouter().push(`/trips/waitlist/${data.date}/details`)
}

const tableFields = ref([
    {
        text: 'DATE',
        value: 'date'
    },
    {
        text: 'NUMBER OF ROUTES',
        value: 'waitlistCount'
    },
    {
        text: 'NUMBER OF ROUTES',
        value: 'routeCount'
    }
])

</script>
