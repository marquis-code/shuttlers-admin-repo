<template>
	<Modal modal="$atts.modal" title="Add Bank Account">
		<form class="flex flex-col gap-4 w-full" @submit.prevent="addNewBankAccount">
			<div class="flex flex-col gap-2">
				<label class="label">Bank Name</label>
				<select v-model="bankObj" required class="input-field">
					<option value="">
						Select Bank
					</option>
					<option v-for="(bank, index) in allBanks" :key="index" :value="bank">
						{{ bank.name }}
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Account Number</label>
				<input v-model="form.accountNumber" required type="text" class="input-field">
				<p v-if="form.accountNumber.length && form.accountNumber.length < 10" class="input-field">
					Account Number is not complete
				</p>
				<div v-if="validating" class="absolute bottom-[-1px] right-2">
					<div class="spinner-border" role="status">
						<Spinner />
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Account Name</label>
				<input v-model="accName" required readonly type="text" class="input-field">
			</div>
			<div class="pt-6">
				<button type="submit" :disabled="loading || !isFormEmpty"
					class="text-sm bg-black p-[16px] text-white rounded-md text-center w-full mt-2 disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
					{{ loading ? 'processing...' : 'Add Account' }}
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import banks from 'ng-banks'
import { useValidateAccountNumber } from '@/composables/modules/partners/validateAccountNumber'
import { useAddBankAccount } from '@/composables/modules/partners/addBankAccount'

const { validateAccountNumber, loading: validating, accName } = useValidateAccountNumber()
const { addBankAccount, loading, setAccountCreationPayload, getBanks, allBanks } = useAddBankAccount()

const bankObj = ref({}) as any
const form = reactive({
        accountNumber: '',
        accountName: accName.value || '',
        bankCode: '',
        bankName: '',
        partnerId: ''
    })

const addNewBankAccount = () => {
    const payload = {
        accountNumber: form.accountNumber,
        accountName: accName.value,
        bankCode: bankObj.value.code,
        bankName: bankObj.value.name,
        partnerId: useRoute().params.accountSid
    }
    setAccountCreationPayload(payload)
    addBankAccount()
}

watch(() => form.accountNumber, (val) => {
    if (String(form.accountNumber).length === 10) validateAccountNumber(bankObj.value.code, val)
})

// const loadBanks = () => {
//     const ngBanks = banks.getBanks()
//     allBanks.value = ngBanks || []
// }

getBanks()

const isFormEmpty = computed(() => {
    return !!(bankObj.value.name && form.accountNumber && accName.value)
})
</script>

<style scoped>
label {
    margin: 0;
}
</style>
