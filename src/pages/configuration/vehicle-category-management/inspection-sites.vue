<template>
	<main class="">
		<Table :loading="loadingInspectionSite" :headers="tableFields" :table-data="inspectionSiteList">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :selected="log_ids" :checkbox="true" @filter="onFilterUpdate" @checked="log_ids = ($event)" />
			</template>
			<template #item="{ item }">
				<span v-if="item.id" class="flex items-center gap-4">
					<div class="flex items-center">
						<button>Edit</button>
						<button>Delete</button>
					</div>
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
import { useInspectionSitesList } from '@/composables/modules/configure/fetch'

const { getInspectionSiteList, loadingInspectionSites, inspectionSiteList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useInspectionSitesList()

getInspectionSiteList()

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
        text: 'ADDRESS',
        value: 'address'
    },
    {
        text: 'ACTION',
        value: 'id'
    }
])

</script>
