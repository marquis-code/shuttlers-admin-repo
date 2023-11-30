<template>
	<Modal
		modal="$atts.modal"
		:title="`${isEditBranch ? 'Edit' : 'Add'} Office Branch`"
	>
		<form class="flex flex-col gap-6" @submit.prevent="handleCreateWorkBranch">
			<!-- {{ createWorkBranchForm }} -->
			<div class="field relative">
				<label for="branch-name">Name</label>
				<input id="branch-name" v-model="form.name" type="text" class="input-field">
			</div>
			<div class="field relative">
				<label for="branch-address">Office address</label>
				<LocationInput
					id="eventLocation"
					v-model="form.address"
					type="text"
					name="eventLocation"
					class="input-field"
					placeholder=""
					@change="selectedAddress"
				/>
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Add work branch
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCreateWorkBranch } from '@/composables/modules/corporates/workBranches'
const { createWorkBranchForm, isEditBranch, loading, createWorkBranch, populateWorkBranch, deleteWorkBranch, updateWorkBranch } = useCreateWorkBranch()
const form = reactive({
 name: '',
address: '' as any,
location: '',
description: ''
})

if (isEditBranch.value) {
	form.name = createWorkBranchForm.name.value
	form.address = createWorkBranchForm.address.value
	form.location = createWorkBranchForm.location.value
	form.description = createWorkBranchForm.description.value
}

const isFormEmpty = computed(() => {
    return !!(form.address && form.name)
})

const selectedAddress = (val) => {
	form.address = val.name
	form.location = `${val.lat},${val.lng}`
}

const handleCreateWorkBranch = () => {
	const payload = {
		name: form.name,
		address: form.address,
		location: form.location,
		description: form.name
	}
	populateWorkBranch(payload)
	createWorkBranch()
}

</script>

<style>

</style>
