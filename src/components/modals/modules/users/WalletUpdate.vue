<template>
	<Modal
		modal="$atts.modal"
		:title="`${walletActionType?.charAt(0)?.toUpperCase() + walletActionType.slice(1)} Wallet`"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="handleWalletUpdate">
			<div class="flex justify-center items-center flex-col">
				<p class="text-gray-500 text-sm">
					WALLET BALANCE
				</p>
				<p class="font-medium">
					{{ convertToCurrency(selectedUser?.wallet?.amount) }}
				</p>
			</div>
			<div class="field relative">
				<label for="amount">{{ walletActionType === 'debit' ? 'Debit' : 'Topup' }} Amount</label>
				<input id="amount" v-model="form.amount" type="number" class="input-field" required>
			</div>
			<div class="field relative">
				<label for="title">{{ walletActionType === 'debit' ? 'Debit' : 'Topup' }} Description</label>
				<textarea id="title" v-model="form.title" class="input-field" required />
			</div>
			<div class="field relative">
				<label for="source">Account</label>
				<select id="source" v-model="form.source" class="input-field" required>
					<option v-for="item in accountSource" :key="item.value" :value="item.value">
						{{ item.name }}
					</option>
				</select>
			</div>
			<div class="flex justify-between items-center gap-x-10">
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full" @click="useUserModal().closeWalletUpdate()">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!createLoading" class="text-sm">{{ walletActionType === 'debit' ? 'Debit' : 'Topup' }} Wallet</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script lang="ts" setup>
import { convertToCurrency } from '@/composables/utils/formatter'
import { useUserModal } from '@/composables/core/modals'
import { useUserIdDetails } from '@/composables/modules/users/id'
import { useCreateUsers } from '@/composables/modules/users/create'
const { selectedUser } = useUserIdDetails()
const { updateUserWallet, populateWalletUpdateForm, loading: createLoading, walletActionType } = useCreateUsers()

 const route = useRoute()
const id = String(route.params.id)

 const isButtonEnabled = computed(() => {
	return !!(form.amount && form.title.length && form.source.length)
})

 const form = reactive({
    amount: '',
    title: '',
    source: ''
 })

 const handleWalletUpdate = () => {
    const payload = {
        amount: form.amount,
        title: form.title,
        source: form.source,
        type: walletActionType.value
    }
    const wallet_id = selectedUser?.value?.wallet?.id
	populateWalletUpdateForm(payload)
	updateUserWallet(id, wallet_id)
 }

 const creditAccountSource = ref([
	{
		name: 'Main Balance',
		value: 'main_balance'
	},
	{
		name: 'Company Balance',
		value: 'credit_account'
	}
 ])

 const debitAccountSource = ref([
	{
		name: 'Main Balance',
		value: 'main_balance'
	},
	{
		name: 'Company Balance',
		value: 'credit_account'
	}
 ])

 const accountSource = computed(() => {
	return walletActionType.value === 'debit' ? debitAccountSource.value : creditAccountSource.value
 })
</script>
