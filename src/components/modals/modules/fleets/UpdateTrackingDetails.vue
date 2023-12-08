<template>
	<Modal
		modal="$atts.modal"
		title="Update Vehicle Tracking Details"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="updateVehicleTrackingInfo">
			<div class="field relative">
				<label for="trackingId">Tracking ID</label>
				<input id="trackingId" v-model="updateForm.tracking_id.value" type="tel" class="input-field" required>
			</div>
			<div class="field relative">
				<label for="providerName">Provider Name</label>
				<input id="providerName" v-model="updateForm.provider_name.value" type="text" class="input-field" required>
			</div>

			<div class="field relative">
				<label for="providerDescription">Provider Description</label>
				<textarea id="providerDescription" v-model="updateForm.provider_description.value" rows="6" cols="6" class="input-field" required />
			</div>

			<div class="flex justify-between items-center gap-x-10">
				<button type="button" class="bg-gray-600 py-3 rounded-md text-white w-full" @click="useVehicleModal().closeUpdateVehicleTracking()">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary py-3 w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!loading" class="text-sm">Update</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useVehicleModal } from '@/composables/core/modals'
import { useUpdateTrackingInfo } from '@/composables/modules/fleets/updateTrackingInfo'
const { updateForm, loading, updateVehicleTrackingInfo } = useUpdateTrackingInfo()

const isButtonEnabled = () => {
    return !!(updateForm.tracking_id.value && updateForm.provider_name.value && updateForm.provider_description.value)
}
</script>
