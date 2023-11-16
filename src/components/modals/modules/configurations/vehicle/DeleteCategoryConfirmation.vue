<template>
	<Modal
		modal="$atts.modal"
		title="Are you sure you want to delete ?"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="deleteCategory">
			<div class="flex items-center justify-between rounded-lg px-2 py-3 bg-indigo-100">
				<img src="@/assets/icons/source/caution.svg" alt="caution">
				<p class="text-sm text-indigo-600">
					{{ selectedActionType === 'inspection' ? 'You are about to delete this inspection Site' : 'Please note that 1 vehicles are attached to this category you\'re about to delete' }}
				</p>
			</div>
			<div class="field relative">
				<label for="oldPassword">If you want to delete this {{ selectedActionType === 'inspection' ? 'inspection site' : 'category' }}, type YES to proceed</label>
				<input id="oldPassword" v-model="form.password" type="type YES" class="input-field" required>
			</div>
			<div class="flex justify-between items-center gap-x-10">
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full" @click="useVehicleConfigurationModal().closeDeleteVehicleCategory()">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!createLoading" class="text-sm">Proceed</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useVehicleConfigurationModal } from '@/composables/core/modals'
import { useCreateVehicle } from '@/composables/modules/configure/vehicles/create'
const { deleteVehicleTypes, deleteInspectionSite, selectedVehicleCategory, loading: createLoading, selectedActionType } = useCreateVehicle()
const form = reactive({
    password: ''
})
const deleteCategory = () => {
    const id = Number(selectedVehicleCategory.value?.id)
    if (form.password === 'YES' && selectedActionType.value === 'category-management') {
        deleteVehicleTypes(id)
    }

    if (form.password === 'YES' && selectedActionType.value === 'inspection') {
        deleteInspectionSite(id)
    }
}
const isButtonEnabled = computed(() => {
    return form.password === 'YES'
})
</script>

<style>
</style>
