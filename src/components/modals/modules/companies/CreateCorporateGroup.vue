<template>
	<Modal
		modal="$atts.modal"
		:title="`${Object.keys(selectedCorporateGroup).length ? 'Edit' : 'Create'} Group`"
	>
		<form class="flex flex-col gap-6 gap-y-10" @submit.prevent="createCorporateGroup">
			<div class="field relative">
				<label for="start_time">Group Name</label>
				<input id="start_time" v-model="corporateGroupForm.name.value" type="text" class="input-field">
			</div>
			<div class="flex items-center gap-x-6">
				<button class="bg-gray-500 text-white w-full py-3 rounded-md" @click="useCompaniesModal().closeCreateCorporateGroup()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!loading" class="flex justify-center text-sm items-center gap-2.5">
						Create
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCorporateGroupByGroupId } from '@/composables/modules/corporates/getCorporateGroupByGroupId'
import { useCreateCorporateGroup } from '@/composables/modules/corporates/createCorporateGroup'
import { useCompaniesModal } from '@/composables/core/modals'
const { corporateGroupForm, loading, createCorporateGroup } = useCreateCorporateGroup()
const { selectedCorporateGroup } = useCorporateGroupByGroupId()
const isFormEmpty = computed(() => {
    return !!(corporateGroupForm.name.value)
})
</script>

<style>

</style>
