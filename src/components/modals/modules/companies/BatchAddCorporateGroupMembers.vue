<template>
	<Modal
		modal="$atts.modal"
		title="Add Members"
	>
		<form class="flex flex-col gap-6 space-y-7" @submit.prevent="handleSubmit">
			<div class="field relative">
				<CorporatesStaffMultiSelect class="w-full" label="" @update:modelValue="handleSelectedCorporates" />
			</div>
			<div class="flex space-x-6">
				<button class="bg-gray-500 text-white p-3 rounded-md w-full" @click="useCompaniesModal().closeBatchAddCorporateGroupMembers()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!processing" class="flex justify-center items-center gap-2.5">
						Add
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAddCorporateGroupMembers } from '@/composables/modules/corporates/createCorporateGroupMembers'
import { useCompaniesModal } from '@/composables/core/modals'
const { createCorporateGroupMembers, loading: processing, payload } = useAddCorporateGroupMembers()

const handleSelectedCorporates = (val:any) => {
	payload.staff_ids.value.push(val.id)
}

const isFormEmpty = computed(() => {
    return !!(payload.staff_ids.value)
})

const handleSubmit = () => {
	createCorporateGroupMembers()
}

</script>
