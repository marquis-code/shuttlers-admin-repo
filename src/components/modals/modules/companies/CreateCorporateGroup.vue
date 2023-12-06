<template>
	<Modal
		modal="$atts.modal"
		title="Create Group"
	>
		<form class="flex flex-col gap-6 gap-y-10" @submit.prevent="createCorporateGroup">
			<div class="field relative">
				<label for="start_time">Group Name</label>
				<input id="start_time" v-model="form.group_name" type="text" class="input-field">
			</div>
			<div class="flex items-center gap-x-6">
				<button class="bg-gray-500 text-white w-full py-3 rounded-md" @click="useCompaniesModal().closeCreateCorporateGroup()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="isFormEmpty">
					<span class="flex justify-center text-sm items-center gap-2.5">
						Create
					</span>
					<!-- <Spinner v-else /> -->
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCompaniesModal } from '@/composables/core/modals'
const form = reactive({
 group_name: ''
})

const isFormEmpty = computed(() => {
    return !!(form.group_name)
})

const createCorporateGroup = () => {

}

</script>

<style>

</style>
