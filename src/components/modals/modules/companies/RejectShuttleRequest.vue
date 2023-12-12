<template>
	<Modal
		modal="$atts.modal"
		title="Duplicate Routes"
	>
		<form class="flex flex-col gap-6 gap-y-10 mt-6" @submit.prevent="proceedToReject">
			<div class="field relative">
				<label for="comment" class="text-lg">Rejection comment</label>
				<textarea id="comment" v-model="form.rejection_reason" rows="4" cols="4" class="input-field resize-none" />
			</div>
			<div class="flex items-center gap-x-6">
				<button class="bg-gray-500 text-white w-full py-3 rounded-md" @click="useCompaniesModal().closeCreateCorporateGroup()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!loading" class="flex justify-center text-sm items-center gap-2.5">
						Continue
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCompaniesModal } from '@/composables/core/modals'
import { useRejectShuttleRequest } from '@/composables/modules/corporates/rejectShuttleRequest'
const { rejectShuttleRequest, loading, populateRejectionForm } = useRejectShuttleRequest()
const form = reactive({
 rejection_reason: ''
})

const isFormEmpty = computed(() => {
    return !!(form.rejection_reason)
})

const proceedToReject = () => {
    const payload = {
        rejection_reason: form.rejection_reason,
        status: 'deactivated'
    }
    populateRejectionForm(payload)
    rejectShuttleRequest()
}

</script>

<style>

</style>
