<template>
	<Modal
		modal="$atts.modal"
		title="Add Members"
	>
		<form class="flex flex-col gap-6 space-y-7" @submit.prevent="addAccountManager">
			<div class="field relative">
				<div>
					<CorporatesStaffMultiSelect class="w-full" label="" @update:modelValue="handleSelectedCorporates" />
				</div>
				<!-- <label for="start_time">Select Staff</label>
				<select v-if="!loading" v-model="form.staffId" class="input-field">
					<option v-for="(itm, idx) in staffsData" :key="idx" :value="itm.id">
						{{ itm.fname }} {{ itm.lname }}
					</option>
				</select>
				<Skeleton v-else height="50px" /> -->
			</div>
			<div class="flex space-x-6">
				<button class="bg-gray-500 text-white p-3 rounded-md w-full" @click="useCompaniesModal().closeAddAccountManagers()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!proccessingManagerAssignment" class="flex justify-center items-center gap-2.5">
						Add
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAssignManager } from '@/composables/modules/corporates/assignAccountManager'
import { useGetStaffs } from '@/composables/modules/staffs/fetch'
import { useCompaniesModal } from '@/composables/core/modals'
const { assignBusinessAccountManager, loading: proccessingManagerAssignment, populateAssignForm } = useAssignManager()
const { getStaffs, loading, staffsData } = useGetStaffs()
const id = Number(useRoute().params.id)
getStaffs()
const form = reactive({
	staffId: ''
})

const isFormEmpty = computed(() => {
    return !!(form.staffId)
})

const addAccountManager = () => {
	populateAssignForm(form)
	assignBusinessAccountManager()
}

</script>

<style>

</style>
