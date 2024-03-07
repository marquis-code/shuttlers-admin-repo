<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
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
						showDateRange: true,
					}"
					@filter="onFilterUpdate"
					@download="downloadAllIssues"
				>
					<template #filter_others>
						<select v-model="incident" class="min-w-[100px] w-fit pr-4 border py-1.5 px-2 rounded-md outline-none">
							<option value="">
								All
							</option>
							<option v-for="n in issues_types" :key="n.id" :value="n.name">
								{{ n.name }}
							</option>
						</select>
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
					{{ moment(item.data?.checkup_date_time).format('ll') }} ({{ moment.utc(item.data?.checkup_date_time).format('LT') }})
				</p>
				<p v-if="item.logged_by" class="text-sm whitespace-nowrap">
					{{ item.data?.staff?.fname || '' }} {{ item.data?.staff?.lname || '' }}
				</p>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-40" />
				</span>
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
import { useFetchIssues, useResolveIssues, useCreateIssues } from '@/composables/modules/trips/issues'
import { useFetchIssueTypes } from '@/composables/modules/trips/issues/types/fetch'

const { loading, issues, fetchIssues, prev, page, total, next, moveTo, onFilterUpdate, incident, downloadAllIssues } = useFetchIssues()
const { issues_types, fetchIssuesTypes } = useFetchIssueTypes()
const { initResolveIssues } = useResolveIssues()
const { initUpdateIssues } = useCreateIssues()
const tableFields = ref([
	{ value: 'route_code', text: 'Route code' },
	{ value: 'pilot', text: 'Pilot' },
	{ value: 'start_date', text: 'Start date/time' },
	{ value: 'incident_type', text: 'Incident' },
	{ value: 'check_up_date', text: 'Check up date/time' },
	{ value: 'logged_by', text: 'Logged by' },
	{ value: 'action', text: '' }
])

const dropdownChildren = computed(() => [
	{ name: 'Resolve issue', func: (data:any) => { initResolveIssues(data) } },
	{ name: 'Edit', func: (data:any) => { initUpdateIssues(data) } }
])

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
fetchIssuesTypes()
fetchIssues()
</script>

<style scoped>

</style>
