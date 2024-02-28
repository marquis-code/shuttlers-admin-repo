<template>
	<Modal
		modal="$atts.modal"
		:title="isEdit ? 'Edit Wallet Notification' : 'Add Wallet Notification'"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="isEdit ? updateNotification() : addNotification()">
			<div class="flex flex-col gap-1">
				<label class="label">Amount</label>
				<input v-model="amount" required type="number" class="input-field">
			</div>
			<div class="flex flex-col gap-1">
				<label class="label">Status</label>
				<select v-model="status" class="input-field">
					<option v-for="n in ['active', 'inactive']" :key="n" :value="n">
						{{ Capitalize(n) }}
					</option>
				</select>
			</div>

			<button type="submit" :disabled="loading || !enableButton"
				class="mt-10 text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : `${isEdit ? 'Update' : 'Add'} notification` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { Capitalize } from '@/composables/utils/formatter'
import { useCompaniesWalletNotification } from '@/composables/modules/corporates/wallet-notification/create'

const { loading, amount, status, isEdit, addNotification, clearObj, updateNotification } = useCompaniesWalletNotification()
const enableButton = computed(() => {
    return !!(amount.value && status.value)
})

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
