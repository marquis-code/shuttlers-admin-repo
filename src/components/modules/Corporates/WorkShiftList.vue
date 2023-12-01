<template>
	<section class="space-y-4">
		<div v-for="(itm, idx) in workShifts" :key="idx" class="flex justify-between border items-center px-6 py-3 rounded-md">
			<div>{{ itm.description }}</div>
			<div class="flex items-center gap-x-3">
				<img class="cursor-pointer" src="@/assets/icons/source/edit-pen.svg" alt="" @click="editShift(itm)">
				<img class="cursor-pointer" src="@/assets/icons/source/delete-basket.svg" alt="" @click="deleteShift(itm)">
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { useCompaniesModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCreateWorkShift } from '@/composables/modules/corporates/workShifts'
const { deleteWorkShift, loading, isEditShift, populateWorkShift } = useCreateWorkShift()
 const props = defineProps({
    workShifts: {
        type: Array,
        required: true,
        default: () => []
    }
 })

 const editShift = (itm) => {
	isEditShift.value = true
	const payload = {
	name: itm.name,
	address: itm.address,
	location: itm.location,
	description: itm.description
}
   useCompaniesModal().openAddWorkBranch()
   populateWorkShift(payload)
 }

 const deleteShift = (itm) => {
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: 'Are you sure you want to delete this work shift?',
		loading,
		call_function: () => deleteWorkShift(itm.id)
    })
}
</script>
