<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="corporateTripReport" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange: true}" @filter="onFilterUpdate" />
				<div class="flex justify-end items-end border-x bg-white py-3 pr-3">
					<button @click="useCompaniesModal().openCorporateVehicleCapacityConfig()" class="bg-black p-3 rounded-md text-sm text-white">
						New Configuration
					</button>
				</div>
			</template>
			<template #item="{ item }">
				<div v-if="item.created_at">
					<span>{{ useDateFormat(item.data.created_at, "hh:mm A, MMMM d, YYYY").value }}</span>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useCompaniesModal } from '@/composables/core/modals'
import { useCorporateTripReport } from '@/composables/modules/corporates/id'
const { corporateTripReport, loading, getCorporateTripReport, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useCorporateTripReport()
const id = useRoute().params.id as string
getCorporateTripReport()

const onRowClicked = (data) => {
	useRouter().push(`/transactions/${data.id}`)
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'VEHICLE TYPE',
        value: 'vehicle_type'
    },
    {
        text: 'SEATS',
        value: 'seats'
    },
    {
        text: 'ACTIONS',
        value: ''
    }
])

</script>
