<template>
	<main class="">
		<Table
			:loading="loading"
			:has-index="true"
			:headers="tableFields"
			:table-data="resolved_issues"
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
						showDateRange: true,
					}"
					@filter="onFilterUpdate"
					@download="downloadAllResolvedIssues"
				/>
			</template>
			<template #sub_header>
				<div class="flex items-stretch justify-end gap-4 p-2 w-full border border-b-0">
					<ButtonMultiSelectDropdown v-model="selected_resolution_type" :children="filterChildren" title="Resolution" />
					<select v-model="incident" class="min-w-[100px] w-fit pr-4 border py-1.5 px-2 rounded-md outline-none bg-light">
						<option value="">
							All
						</option>
						<option v-for="n in issues_types" :key="n.id" :value="n.name">
							{{ n.name }}
						</option>
					</select>
				</div>
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
import { useFetchResolved, useResolveIssues } from '@/composables/modules/trips/issues'
import { useFetchIssueTypes, useFetchResolutionTypes } from '@/composables/modules/trips/issues/types'

const { loading, resolved_issues, selected_resolution_type, incident, fetchResolved, prev, page, total, next, moveTo, onFilterUpdate, downloadAllResolvedIssues } = useFetchResolved()
const { initResolveIssues } = useResolveIssues()
const { issues_types, fetchIssuesTypes } = useFetchIssueTypes()
const { fetchResolutionTypes, resolution_types, loading: fetching_resolution } = useFetchResolutionTypes()

const tableFields = ref([
	{ value: 'route_code', text: 'Route code' },
	{ value: 'pilot', text: 'Pilot' },
	{ value: 'start_date', text: 'Start date/time' },
	{ value: 'incident_type', text: 'Incident' },
	{ value: 'resolution_type', text: 'Resolution' },
	{ value: 'logged_by', text: 'Logged by' }
])

const filterChildren = computed(() => {
	return [
		...resolution_types.value.map((el) => {
			return { name: el.name, value: el.name }
		}),
		// { name: 'Buffer', value: 'exclusive' },
		// { name: 'Pilot warned', value: 'shared' },
		{ name: 'Others', value: 'others' }
	]
})

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
fetchIssuesTypes()
fetchResolutionTypes()
fetchResolved()
</script>

<style scoped>

</style>
