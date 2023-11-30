<template>
	<Modal
		modal="$atts.modal"
		title="Activate Wallet"
	>
		<form class="flex flex-col gap-6 gap-y-10" @submit.prevent="proceedToFundWallet">
			<p class="text-gray-500 text-sm">
				We require your BVN to be able to activate your wallet and create an account for you.
			</p>
			<div class="field relative">
				<label for="start_time">Bvn</label>
				<input id="start_time" v-model="form.bvn" type="text" class="input-field" @input="handleBVNInput">
				<small v-if="form.validationError" class="text-sm text-rose-600 font-medium pt-2">{{ form.validationError }}</small>
			</div>
			<div class="field relative">
				<label for="start_time">Provider</label>
				<select v-model="form.provider" class="input-field">
					<option v-for="(itm, idx) in paymentProvider" :key="idx" :value="itm.value">
						{{ itm.name }}
					</option>
				</select>
			</div>
			<div class="flex items-center gap-x-6 w-full">
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Activate wallet
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCorporateWalletActivation } from '@/composables/modules/corporates/wallet'
const { populateWalletActivationForm, activateCorporateWallet, loading } = useCorporateWalletActivation()
const form = reactive({
 bvn: '',
 provider: '',
 validationError: ''
})

const validateBVN = (bvn:any) => {
    const numericBVN = bvn.replace(/\D/g, '')
    if (numericBVN.length === 11) {
        form.validationError = ''
      } else {
        form.validationError = 'Invalid BVN. Please a valid BVN.'
      }
  }

  watch(() => form.bvn, (val) => {
    validateBVN(val)
  })
  const handleBVNInput = () => {
    validateBVN(form.bvn)
  }

const isFormEmpty = computed(() => {
    return !!(form.bvn && form.provider && !form.validationError.length)
})

const paymentProvider = reactive([
    {
        name: 'Flutterwave',
        value: 'flutterwave'
    },
    {
        name: 'Payed',
        value: 'payed'
    }
])

const proceedToFundWallet = () => {
    const payload = {
        bvn: form.bvn,
       provider: form.provider
    }
    populateWalletActivationForm(payload)
    activateCorporateWallet()
}
</script>

<style>

</style>
