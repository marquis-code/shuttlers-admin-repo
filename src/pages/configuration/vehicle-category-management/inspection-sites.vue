<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loadingInspectionSites" :headers="tableFields" :table-data="inspectionSiteList">
			<template #item="{ item }">
				<span v-if="item.id" class="flex items-center gap-4 py-3">
					<button class="px-3 py-1.5 text-gray-500 border rounded-md border-gray-500 bg-white " @click="handleEdit(item)">Edit</button>
					<button class="px-3 py-1.5 text-rose-500 border rounded-md border-rose-500 bg-white " @click="handleDelete(item)">Delete</button>
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingInspectionSites" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useVehicleConfigurationModal } from '@/composables/core/modals'
import { useInspectionSitesList } from '@/composables/modules/configure/fetch'
import { useCreateVehicle } from '@/composables/modules/configure/vehicles/create'
const { selectedInspectionData, selectedActionType, inspectionSiteForm } = useCreateVehicle()

const { getInspectionSiteList, loadingInspectionSites, inspectionSiteList, moveTo, next, prev, total, page } = useInspectionSitesList()

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

const handleEdit = (val) => {
	useVehicleConfigurationModal().openConfigureInspectionSite()
	inspectionSiteForm.name.value = val.data.name
	inspectionSiteForm.address.value = val.data.address
	inspectionSiteForm.geo_coordinate.value = val.data.geo_coordinate
	selectedInspectionData.value = val.data
}

const handleDelete = (val) => {
	useVehicleConfigurationModal().openDeleteVehicleCategory()
	selectedActionType.value = 'inspection'
	selectedInspectionData.value = val.data
}

</script>
