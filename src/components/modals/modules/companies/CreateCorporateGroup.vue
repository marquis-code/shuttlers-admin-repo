<template>
	<Modal
		modal="$atts.modal"
		:title="`${isEdit ? 'Edit' : 'Create'} Group`"
	>
		<form class="flex flex-col gap-6 gap-y-10" @submit.prevent="isEdit ? editGroup() : createGroup()">
			<div class="field relative">
				<label for="start_time">Group Name</label>
				<input id="start_time" v-model="name" type="text" class="input-field">
			</div>
			<div class="flex items-center gap-x-6">
				<button class="bg-gray-500 text-white w-full py-3 rounded-md" @click="useCompaniesModal().closeCreateCorporateGroup()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!loading" class="flex justify-center text-sm items-center gap-2.5">
						{{ isEdit ? 'Save Edit' : 'Create' }}
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
import { useEditCorporateGroup } from '@/composables/modules/corporates/editCorporateGroup'
import { useCreateGroup } from '@/composables/modules/corporates/group'

const { corporateGroupForm, loading: loadingCreate, createCorporateGroup } = useCreateCorporateGroup()
const { selectedCorporateGroup } = useCorporateGroupByGroupId()
const { editCorporateGroup, loading: loadingEdit } = useEditCorporateGroup()

const { loading, createGroup, clearObj, name, isEdit, editGroup } = useCreateGroup()

const isFormEmpty = computed(() => {
    return !!(name.value)
})

// const editMode = computed(() => {
// 	return Object.keys(selectedCorporateGroup.value).length
// })

// const action = computed(() => {
//   return editMode.value ? editCorporateGroup : createCorporateGroup
// })

// const loading = computed(() => {
// 	return editMode.value ? loadingEdit.value : loadingCreate.value
// })

onBeforeUnmount(() => clearObj())

</script>

<style>

</style>
