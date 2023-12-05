<template>
	<Modal
		modal="$atts.modal"
		title="Corporate Wallet Options"
		class="!text-sm"
	>
		<form class="space-y-6" @submit.prevent="processWalletOptions">
			<div v-if="activeStep === 'walletOptions'" class="space-y-6">
				<div class="space-y-6">
					<label v-for="(val, key) in walletOptions" :key="key" :for="key">
						<input :id="key" v-model="checkedItems[key]" :checked="val" type="checkbox" class=" pr-4">
						{{ key.replace('_', ' ') }}
					</label>
				</div>
				<div class="flex justify-between items-center gap-x-6">
					<button type="button" class="rounded-md py-3 bg-gray-500 text-white w-full" @click="useCompaniesModal().closeCorporateWalletOptions()">
						Cancel
					</button>
					<div class="btn-primary w-full" @click="activeStep = 'confirmation'">
						Proceed
					</div>
				</div>
			</div>
			<div v-if="activeStep === 'confirmation'" class="space-y-6">
				<div class="flex items-center gap-x-3 bg-indigo-300 rounded-2xl py-3 px-6">
					<img src="@/assets/icons/source/caution.svg" class="h-6 w-6" alt="">
					<p class="text-white text-sm">Are you sure you want to save this changes ?</p>
				</div>
				<div class="field relative">
					<label for="confirmation_password">Please enter your password to save your changes</label>
					<input id="confirmation_password" v-model="form.verification_password" type="password" class="input-field">
				</div>
				<div class="flex justify-between items-center gap-x-6">
					<button class="rounded-md py-3 bg-gray-500 text-white w-full" @click="activeStep = 'walletOptions'">
						Cancel
					</button>
					<button type="submit" class="btn-primary w-full">
						<span v-if="!loading" class="flex justify-center text-sm items-center gap-2.5">
							Proceed
						</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useCoporateOptions } from '@/composables/modules/corporates/configureCorporateOptions'
import { useCompaniesModal } from '@/composables/core/modals'
const { selectedCorporate } = useCorporateIdDetails()
const { populateCorporateOptionsForm, processCorporatesOptions, loading, corporateOptionsForm } = useCoporateOptions()
const activeStep = ref('walletOptions')
const form = reactive({
	verification_password: ''
})

const walletOptions = computed(() => {
	return {
		restrict_booking_on_public_routes: selectedCorporate.value.restrict_booking_on_public_routes === 1,
		restrict_booking_on_public_routes_with_corporate_wallet: selectedCorporate.value.restrict_booking_on_public_routes_with_corporate_wallet === 1,
		restrict_booking_on_private_routes_with_personal_wallet: selectedCorporate.value.restrict_booking_on_private_routes_with_personal_wallet === 1,
		restrict_booking_on_private_routes_with_corporate_wallet: selectedCorporate.value.restrict_booking_on_private_routes_with_corporate_wallet === 1
	}
})
const checkedItems = ref({}) as any
const processWalletOptions = () => {
	const payload = {
		restrict_booking_on_public_routes: checkedItems?.value?.restrict_booking_on_public_routes,
		restrict_booking_on_public_routes_with_corporate_wallet: checkedItems?.value?.restrict_booking_on_public_routes_with_corporate_wallet,
		restrict_booking_on_private_routes_with_personal_wallet: checkedItems?.value?.restrict_booking_on_private_routes_with_personal_wallet,
		restrict_booking_on_private_routes_with_corporate_wallet: checkedItems?.value?.restrict_booking_on_private_routes_with_corporate_wallet,
        verification_password: form.verification_password
	}
	populateCorporateOptionsForm(payload)
	processCorporatesOptions()
}
</script>
