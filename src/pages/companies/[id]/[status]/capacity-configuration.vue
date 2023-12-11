<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="capacityConfigurationList" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:false}" />
				<div class="flex justify-end items-end border-x bg-white py-3 pr-3">
					<button class="bg-black p-3 rounded-md text-sm text-white" @click="useCompaniesModal().openCorporateVehicleCapacityConfig()">
						New Configuration
					</button>
				</div>
			</template>
			<template #item="{ item }">
				<div v-if="item.id" class="flex items-center gap-x-3">
					<button class="border rounded-md text-gray-900 text-sm border-gray-800 px-3 py-2.5" @click="editConfiguration(item.data)">
						Edit
					</button>
					<button class="border rounded-md text-gray-900 text-sm border-gray-800 px-3 py-2.5" @click="deleteConfiguration(item.data)">
						Delete
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
import { useCompaniesModal } from '@/composables/core/modals'
import { useCreateCapacityConfiguration } from '@/composables/modules/corporates/capacityConfiguration/createCapacityConfiguration'
import { useDeleteCapacityConfiguration } from '@/composables/modules/corporates/capacityConfiguration/deleteCapacityConfiguration'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useGetCapacityConfiguration } from '@/composables/modules/corporates/capacityConfiguration/getCapacityConfiguration'
const { getCapacityConfiguration, loading, capacityConfigurationList, moveTo, next, prev, total, page } = useGetCapacityConfiguration()
const { createCapacityConfiguration, loading: editing, configurationForm, actionType, populateConfigForm } = useCreateCapacityConfiguration()
const { deleteCapacityConfiguration, loading: deleting } = useDeleteCapacityConfiguration()

const id = useRoute().params.id as string
getCapacityConfiguration()

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
        value: 'id'
    }
])

const editConfiguration = (itm) => {
	actionType.value = 'edit'
	populateConfigForm(itm)
	useCompaniesModal().openCorporateVehicleCapacityConfig()
}

const deleteConfiguration = (itm) => {
	useConfirmationModal().openAlert({
            title: 'Please Confirm',
            type: 'NORMAL',
            desc: 'Are you sure you want to delete this vehicle capacity configuration?',
            loading: deleting,
            call_function: () => deleteCapacityConfiguration(itm.id)
        })
}
</script>
