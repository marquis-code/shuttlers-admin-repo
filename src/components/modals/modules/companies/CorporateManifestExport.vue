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
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!loading" class="flex justify-center text-sm items-center gap-2.5">
						Generate
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useExportCorporateRouteManifest } from '@/composables/modules/corporates/exportManifest'
import { useCompaniesModal } from '@/composables/core/modals'
const { populateRouteManifestExportForm, exportCorporateRouteManifest, loading, corporateRouteManifestExportForm } = useExportCorporateRouteManifest()
const formatDate = (inputDateString) => {
  const inputDate = new Date(inputDateString)

  if (isNaN(inputDate.getTime())) {
    return null
  }

  const year = inputDate.getFullYear()
  const month = String(inputDate.getMonth() + 1).padStart(2, '0')
  const day = String(inputDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

const form = reactive({
   startDate: formatDate(new Date()) as any,
   endDate: ''
})

const isFormEmpty = computed(() => {
    return !!(form.startDate && form.endDate)
})

const proceedToGenerateManifest = () => {
	const payload = {
		start_date: form.startDate,
		end_date: form.endDate
	}
	populateRouteManifestExportForm(payload)
	exportCorporateRouteManifest()
}

</script>

<style>

</style>
