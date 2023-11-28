<template>
	<Modal
		modal="$atts.modal"
		title="Manifest report (Select date range)"
	>
		<form class="flex flex-col gap-6 gap-y-7" @submit.prevent="proceedToGenerateManifest">
			<div class="field relative">
				<label for="startDate">Start Date</label>
				<InputDateInput id="startDate" v-model="form.startDate" class="font-light" placeholder="Filter by date" />
			</div>
			<div class="field relative">
				<label for="endDate">End Date</label>
				<InputDateInput id="endDate" v-model="form.endDate" class="font-light" placeholder="Filter by date" />
			</div>

			<div class="flex justify-between items-center gap-x-6">
				<button class="rounded-md py-3 bg-gray-500 text-white w-full" @click="useCompaniesModal().closeCorporateManifestExport()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="isFormEmpty">
					<span class="flex justify-center text-sm items-center gap-2.5">
						Generate
					</span>
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCompaniesModal } from '@/composables/core/modals'
const form = reactive({
   startDate: '',
   endDate: ''
})

const isFormEmpty = computed(() => {
    return !!(form.startDate && form.endDate)
})

const proceedToGenerateManifest = () => {

}

</script>

<style>

</style>
