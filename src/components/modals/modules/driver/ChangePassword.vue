<template>
	<Modal
		modal="$atts.modal"
		title="Change user password"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="changePassword">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-1">
					<label class="label">New password</label>
					<input v-model.trim="password" required type="password" class="input-field">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Password confirmation</label>
					<input v-model.trim="confirm_password" required type="password" class="input-field">
					<small v-if="confirm_password.length && password !== confirm_password" class="text-xs font-medium text-red">Password doesnt match</small>
				</div>
			</div>

			<button type="submit" :disabled="loading || (password !== confirm_password)"
				class="mt-10 text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : 'Change password' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useDriverPassword } from '@/composables/modules/drivers'

const { loading, password, confirm_password, changePassword, clearObj } = useDriverPassword()

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
