<template>
	<main class="">
		<Table
			:loading="loading"
			:has-index="true"
			:headers="tableFields"
			:table-data="issues"
			:has-options="false"
			:had-index="true"
			:page="page"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showStatus: false,
						showSearchBar: true,
						showDownloadButton: true,
						showDatePicker: true,
					}"
					@filter="onFilterUpdate"
				>
					<template #filter_others>
						<div class="flex items-stretch gap-2">
							<ButtonMultiSelectDropdown :children="filterChildren" title="Resolution" />
							<select class="min-w-[100px] w-fit pr-4 border py-1.5 px-2 rounded-md outline-none">
								<option value="all">
									All
								</option>
							</select>
						</div>
					</template>
				</TableFilter>
			</template>
			<template #item="{ item }">
				<p v-if="item.route_code" class="text-sm text-[#7493CB] font-medium whitespace-nowrap">
					{{ item.data.routeday?.route?.route_code || '' }}
				</p>
				<div v-if="item.pilot" class="flex flex-col gap-[2px] text-sm font-medium">
					<p>{{ item.data?.driver?.fname || '' }} {{ item.data?.driver?.lname || '' }}</p>
					<p class="text-[#7493CB]">
						{{ item.data?.driver?.phone || 'N/A' }}
					</p>
				</div>
				<p v-if="item.start_date" class="text-sm whitespace-nowrap">
					{{ moment(item.data?.routeday?.trip_date).format('ll') }} ({{ item.data.routeday?.itinerary?.trip_time || 'N/A' }})
				</p>
				<p v-if="item.check_up_date" class="text-sm whitespace-nowrap">
					{{ moment(item.data?.check_up_date).format('ll') }} ({{ moment.utc(item.data?.check_up_date).format('LT') }})
				</p>
				<p v-if="item.logged_by" class="text-sm whitespace-nowrap">
					{{ item.data?.staff?.fname || '' }} {{ item.data?.staff?.lname || '' }}
				</p>
			</template>

			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loading"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
import { useFetchIssues, useResolveIssues } from '@/composables/modules/trips/issues'

const { loading, issues, fetchIssues, prev, page, total, next, moveTo, onFilterUpdate } = useFetchIssues()
const { initResolveIssues } = useResolveIssues()
const tableFields = ref([
	{ value: 'route_code', text: 'Route code' },
	{ value: 'pilot', text: 'Pilot' },
	{ value: 'start_date', text: 'Start date/time' },
	{ value: 'incident_type', text: 'Incident' },
	{ value: 'resolution', text: 'Resolution' },
	{ value: 'logged_by', text: 'Logged by' }
])

const filterChildren = [
	{ name: 'Buffer', value: 'exclusive' },
	{ name: 'Pilot warned', value: 'shared' },
	{ name: 'Others', value: 'others' }
]

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
fetchIssues()
</script>

<style scoped>

</style>
