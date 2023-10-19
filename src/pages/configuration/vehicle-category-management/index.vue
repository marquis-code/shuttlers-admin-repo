<template>
	<main class="">
		<Table :loading="loadingVehicleTypes" :headers="tableFields" :table-data="vehicleTypesList" :has-index="true" :page="page">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :selected="log_ids" :checkbox="true" @filter="onFilterUpdate" @checked="log_ids = ($event)" />
			</template>
			<template #item="{ item }">
				<span v-if="item.id" class="flex items-center gap-4">
					<button class="px-3 py-1.5 text-gray-500 border rounded-md border-gray-500 bg-white ">Edit</button>
					<button class="px-3 py-1.5 text-rose-500 border rounded-md border-rose-500 bg-white ">Delete</button>
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
        text: 'CATEGORY',
        value: 'name'
    },
    {
        text: 'DESCRIPTION',
        value: 'description'
    },
    {
        text: 'ACTION',
        value: 'id'
    }
])
</script>
