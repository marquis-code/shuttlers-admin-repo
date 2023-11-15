<template>
	<Modal
		modal="$atts.modal"
		title="Create Inspection Site"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="createInspectionSite">
			<div class="field relative">
				<label for="name">Name</label>
				<input id="name" v-model="form.name" type="text" class="input-field" required>
			</div>
			<div class="field relative">
				<label for="address">Address</label>
				<input id="address" v-model="form.inspectionSite" type="text" class="input-field" required>
			</div>
			<div class="flex justify-between items-center gap-x-10">
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!createLoading" class="text-sm">Create Site</span>
					<Spinner v-else />
				</button>
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full" @click="useAdminModal().closeChangePassword()">
					Cancel
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAdminModal } from '@/composables/core/modals'
import { useCreateAdmin } from '@/composables/modules/staffs/create'
const { populatePasswordUpdateForm, updateAdminPassword, loading: createLoading } = useCreateAdmin()
const form = ref({
    name: '',
    geo_coordinate: '',
    address: ''
})
const route = useRoute()

const isButtonEnabled = computed(() => {
	return form.value.name.length > 0 && form.value.address.length > 0
})

const createInspectionSite = () => {
	const payload = {
        address: form.value.address,
        geo_coordinate: form.value.geo_coordinate,
        name: form.value.name
    }
	populateInspectionSiteForm(payload)
	createInspectionSite()
}
</script>

<style>

</style>
