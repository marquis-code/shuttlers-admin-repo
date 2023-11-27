<template>
	<main class="">
		<Table :loading="loadingInspectionDays" :headers="tableFields" :table-data="fleetInspectionDaysList">
			<!-- <template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template> -->
			<template #item="{ item }">
				<div v-if="item.vehicle">
					<span class="text-blue-500">{{ item.data.vehicle }}</span>
				</div>
				<div v-if="item.registrationNumber" class="">
					<p>
						{{ item.data.registrationNumber }}
					</p>
				</div>
				<div v-if="item.seats">
					<p>
						{{ item.data.seats }}
					</p>
				</div>
				<div v-if="item.inspectionSite">
					<span>{{ item.data.inspectionSite }}</span>
				</div>
				<div v-if="item.inspectionDateAndTime">
					<span>{{ item.data.inspectionDateAndTime }}</span>
				</div>

				<div v-if="item.partner">
					<span class="text-blue-500">{{ item.data.partner }}</span>
				</div>
				<span v-if="item.created_at">
					{{ moment(item.data?.created_at).format('LL') }}
				</span>
			</template>
			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loadingInspectionDays"
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
import { useGetFleetInspectionDays } from '@/composables/modules/fleets/fetch'

const { getFleetsInspectionDaysList, loadingInspectionDays, fleetInspectionDaysList, moveTo, next, prev, total, page } = useGetFleetInspectionDays()
getFleetsInspectionDaysList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    { text: 'VEHICLE', value: 'vehicle' },
    { text: 'PLATE NUMBER', value: 'registrationNumber' },
    { text: 'CAPACITY', value: 'seats' },
    { text: 'INSPECTION SITE', value: 'inspectionSite' },
	{ text: 'PARTNER', value: 'partner' },
    { text: 'DATE SUBMITTED', value: 'created_at' },
    { text: 'INSPECTION DATE AND TIME', value: 'inspectionDateAndTime' }
])

</script>

<style scoped></style>
