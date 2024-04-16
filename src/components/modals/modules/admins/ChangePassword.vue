<template>
	<Modal
		modal="$atts.modal"
		title="Change User Password"
		:no-close-btn="true"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="changePassword">
			<div class="field relative">
				<label for="oldPassword">New Password</label>
				<input id="oldPassword" v-model="form.oldPassword" type="password" class="input-field" required>
			</div>
			<div class="field relative">
				<label for="newPassword">Password Confirmation</label>
				<input id="newPassword" v-model="form.newPassword" type="password" class="input-field" required>
			</div>
			<div class="flex justify-between items-center gap-x-10">
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!createLoading" class="text-sm">Change password</span>
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
    oldPassword: '',
    newPassword: ''
})
const route = useRoute()
const id = String(route.params.id)

const stringEquality = computed(() => {
	if (form.value.oldPassword !== form.value.newPassword) {
        return false
    }
    return true
})

const isButtonEnabled = computed(() => {
	return form.value.oldPassword.length > 0 && form.value.newPassword.length > 0 && stringEquality.value
})

const changePassword = () => {
	const payload = {
        password: form.value.newPassword
    }
	populatePasswordUpdateForm(payload)
	updateAdminPassword(id)
}
</script>

<style>

</style>
