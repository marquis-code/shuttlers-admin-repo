<template>
	<main class="flex flex-col gap-4">
		<ButtonGoBack url="/trips/type/completed" />
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
						showDateRange: false,
					}"
					@filter="onFilterUpdate"
					@download="downloadParticularTripIssues"
				/>
			</template>
			<template #item="{ item }">
				<p v-if="item.check_up_date" class="text-sm whitespace-nowrap">
					{{ moment.utc(item.data?.checkup_date_time).format('LT') }}
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
import moment from 'moment'
import { useUpcomingTripIssues, useResolveIssues, useCreateIssues } from '@/composables/modules/trips/issues'

const { loading, issues, fetchParticularTripIssue, prev, page, total, next, moveTo, onFilterUpdate, downloadParticularTripIssues } = useUpcomingTripIssues()
const { initResolveIssues } = useResolveIssues()
const { initUpdateIssues } = useCreateIssues()
const tableFields = ref([
	{ value: 'incident_type', text: 'Incident' },
	{ value: 'resolution_type', text: 'Resolution' },
	{ value: 'logged_by', text: 'Logged by' },
	{ value: 'check_up_date', text: 'Time' },
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

fetchParticularTripIssue()
</script>
