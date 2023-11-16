<template>
	<Modal
		modal="$atts.modal"
		:title="`${Object.keys(selectedInspectionData).length ? 'Edit' : 'Create'} Inspection site`"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="handleCreateInspectionSite">
			<div class="field relative">
				<label for="name">Name</label>
				<input id="name" v-model="inspectionSiteForm.name.value" type="text" class="input-field" required>
			</div>
			<div class="field relative">
				<label for="address">Address</label>
				<LocationInput
					id="eventLocation"
					v-model="form.address"
					type="text"
					name="eventLocation"
					class="input-field"
					placeholder=""
				/>
			</div>
			<div class="flex justify-between items-center gap-x-10">
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full" @click="useVehicleConfigurationModal().closeConfigureInspectionSite()">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!createLoading" class="text-sm">{{ `${Object.keys(selectedInspectionData).length ? 'Edit' : 'Create'}` }} Site</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useVehicleConfigurationModal } from '@/composables/core/modals'
import { useCreateVehicle } from '@/composables/modules/configure/vehicles/create'
const { selectedInspectionData } = useCreateVehicle()
const { preInspectionSiteForm, createInspectionSite, editInspectionSite, inspectionSiteForm, loading: createLoading } = useCreateVehicle()
const form = ref({
    address: inspectionSiteForm.address.value as any
})

const isButtonEnabled = computed(() => {
	return inspectionSiteForm.name.value.length > 0 && form.value.address.length > 0
})

const handleCreateInspectionSite = () => {
	if (Object.keys(selectedInspectionData).length) {
	editInspectionSite(selectedInspectionData.value.id)
	} else {
	createInspectionSite()
	}
}
</script>

<style>

</style>
