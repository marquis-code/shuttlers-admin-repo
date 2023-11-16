<template>
	<main class="">
		<Table :loading="loadingVehicleTypes" :headers="tableFields" :table-data="vehicleTypesList" :has-index="true" :page="page">
			<template #item="{ item }">
				<div v-if="item.name" class="flex items-center gap-x-4 py-6">
					<img v-if="item.data.image" :src="item.data.image" class="h-10 w-10 rounded-full border bg-white shadow-sm" alt="default bus">
					<img v-else src="@/assets/images/default-bus.png" class="h-10 w-10 rounded-full" alt="default bus">
					<p>{{ item.data.name }}</p>
				</div>
				<span v-if="item.id" class="flex items-center gap-4">
					<button class="px-3 py-1.5 text-gray-500 border rounded-md border-gray-500 bg-white" @click="handleEdit(item)">Edit</button>
					<button class="px-3 py-1.5 text-rose-500 border rounded-md border-rose-500 bg-white" @click="handleDelete(item)">Delete</button>
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useVehicleTypesList } from '@/composables/modules/configure/fetch'
import { useCreateVehicle } from '@/composables/modules/configure/vehicles/create'
import { useVehicleConfigurationModal } from '@/composables/core/modals'
const { selectedVehicleCategory, selectedActionType, loading: createLoading, configureVehicleCategoryForm } = useCreateVehicle()

const { getVehicleTypesList, loadingVehicleTypes, vehicleTypesList, page } = useVehicleTypesList()
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
const handleEdit = (val) => {
	useVehicleConfigurationModal().openConfigureVehicleCategory()
	configureVehicleCategoryForm.name.value = val.data.name
	configureVehicleCategoryForm.description.value = val.data.description
	configureVehicleCategoryForm.cost_of_supply.value = val.data.cost_of_supply
	configureVehicleCategoryForm.break_even_utilization.value = val.data.break_even_utilization
	configureVehicleCategoryForm.pricing_margin.value = val.data.pricing_margin
	configureVehicleCategoryForm.pricing_margin_unit.value = val.data.pricing_margin_unit
	configureVehicleCategoryForm.image.value = val.data.image
	selectedVehicleCategory.value = val.data
}

const handleDelete = (val) => {
	useVehicleConfigurationModal().openDeleteVehicleCategory()
	selectedActionType.value = 'category-management'
	selectedVehicleCategory.value = val.data
}
</script>
