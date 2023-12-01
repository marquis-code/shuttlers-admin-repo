<template>
	<section class="space-y-4">
		<div v-for="(itm, idx) in workBranches" :key="idx" class="flex justify-between items-center border px-6 py-3 rounded-md">
			<div>{{ itm.address }}</div>
			<div class="flex items-center gap-x-3">
				<img class="cursor-pointer" src="@/assets/icons/source/edit-pen.svg" alt="" @click="editBranch(itm)">
				<img class="cursor-pointer" src="@/assets/icons/source/delete-basket.svg" alt="" @click="deleteBranch(itm)">
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { useCompaniesModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCreateWorkBranch } from '@/composables/modules/corporates/workBranches'
const { deleteWorkBranch, loading, isEditBranch, populateWorkBranch } = useCreateWorkBranch()

 const props = defineProps({
    workBranches: {
        type: Array,
        required: true,
        default: () => []
    }
 })
 const editBranch = (itm) => {
	isEditBranch.value = true
	const payload = {
	name: itm.name,
	address: itm.address,
	location: itm.location,
	description: itm.description
}
   useCompaniesModal().openAddWorkBranch()
   populateWorkBranch(payload)
 }

 const deleteBranch = (itm) => {
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: 'Are you sure you want to delete this work branch?',
		loading,
		call_function: () => deleteWorkBranch(itm.id)
    })
}
</script>
