<template>
	<Modal
		modal="$atts.modal"
		title="Assign Account Manager to Business"
	>
		<form class="flex flex-col gap-6 space-y-7" @submit.prevent="createWorkBranch">
			<div class="field relative">
				<label for="start_time">Select Staff</label>
				<InputMultiSelectCompanies />
			</div>
			<div class="flex space-x-6">
				<button class="bg-gray-500 text-white p-3 rounded-md w-full" @click="useCompaniesModal().closeAddAccountManagers()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="isFormEmpty">
					<span class="flex justify-center items-center gap-2.5">
						Assign
					</span>
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCompaniesModal } from '@/composables/core/modals'

const form = reactive({
 start_time: '',
 end_time: ''
})

const isFormEmpty = computed(() => {
    return !!(form.start_time && form.end_time)
})

const createWorkBranch = () => {

}

</script>

<style>

</style>
