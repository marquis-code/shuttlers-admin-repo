<template>
	<main class="">
		<Table :loading="loadingVehicleTypes" :headers="tableFields" :table-data="vehicleTypesList">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :selected="log_ids" :checkbox="true" @filter="onFilterUpdate" @checked="log_ids = ($event)" />
			</template>
			<template #item="{ item }">
				<span v-if="item.category" class="flex items-center gap-4">
					<span>{{ item.data.rating ?? 'N/A' }}</span>
				</span>
				<span v-if="item.action" class="flex items-center gap-4">
					<span>{{ item.data.rating ?? 'N/A' }}</span>
				</span>
				<span v-if="item.index" class="flex items-center gap-4">
					<span>{{ item.data.rating ?? 'N/A' }}</span>
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
import { useVehicleTypesList } from '@/composables/modules/configure/fetch'

const { getVehicleTypesList, loadingVehicleTypes, vehicleTypesList, moveTo, next, prev, total, page } = useVehicleTypesList()
getVehicleTypesList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'ID',
        value: 'index'
    },
    {
        text: 'CATEGORY',
        value: 'category'
    },
    {
        text: 'DESCRIPTION',
        value: 'description'
    },
    {
        text: 'ACTION',
        value: 'action'
    }
])
</script>
