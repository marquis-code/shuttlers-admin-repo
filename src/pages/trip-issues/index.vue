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
						<select class="min-w-[100px] w-fit pr-4 border py-1.5 px-2 rounded-md outline-none">
							<option value="all">
								All
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
					{{ moment(item.data?.check_up_date).format('ll') }} ({{ moment.utc(item.data?.check_up_date).format('LT') }})
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
import { useFetchIssues, useResolveIssues } from '@/composables/modules/trips/issues'

const { loading, issues, fetchIssues, prev, page, total, next, moveTo, onFilterUpdate } = useFetchIssues()
const { initResolveIssues } = useResolveIssues()
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
	{ name: 'Edit', func: (data:any) => { alert(data.id) } }
])

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
fetchIssues()
</script>

<style scoped>

</style>
