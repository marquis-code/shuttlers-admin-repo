<template>
	<main class="">
		<ButtonGoBack url="/companies" class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="corporateTripReport" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange: true}" @filter="onFilterUpdate" />
				<div class="flex justify-end items-end border-x bg-white py-3 pr-3">
					<button class="bg-black p-3 rounded-md text-sm text-white">
						Generate Report
					</button>
				</div>
			</template>
			<template #item="{ item }">
				<div v-if="item.url">
					<button class="font-medium text-shuttlersGreen" @click="downloadReport(item)">
						Download
					</button>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useFileDownloadFromUrl } from '@/composables/utils/downloadFile'
import { useCorporateTripReport } from '@/composables/modules/corporates/id'
const { corporateTripReport, loading, getCorporateTripReport, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useCorporateTripReport()
const { downloadFile } = useFileDownloadFromUrl()
const id = useRoute().params.id as string
getCorporateTripReport()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'NAME',
        value: 'name'
    },
    {
        text: 'DOWNLOAD LINK',
        value: 'url'
    }
])

const downloadReport = (itm) => {
	downloadFile(itm.data.url, `Trip report for ${itm.data.name}`)
}

</script>
