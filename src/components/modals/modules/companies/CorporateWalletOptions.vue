<template>
	<Modal
		modal="$atts.modal"
		title="Corporate Wallet Options"
		class="!text-sm"
	>
		<form class="space-y-6" @submit.prevent="processWalletOptions">
			<div class="space-y-6">
				<label v-for="(val, key, idx) in walletOptions" :key="idx" :for="key">
					<input id="" v-model="checkedItems[idx]" :checked="val" type="checkbox" class=" pr-4" @change="handleChange(idx)">
					{{ key.replace('_', ' ') }}
				</label>
			</div>
			<div class="flex justify-between items-center gap-x-6">
				<button class="rounded-md py-3 bg-gray-500 text-white w-full" @click="useCompaniesModal().closeCorporateWalletOptions()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="isFormEmpty">
					<span class="flex justify-center text-sm items-center gap-2.5">
						Proceed
					</span>
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCoporateOptions } from '@/composables/modules/corporates/configureCorporateOptions'
import { useCompaniesModal } from '@/composables/core/modals'
const { populateCorporateOptionsForm, processCorporatesOptions, loading, corporateOptionsForm } = useCoporateOptions()
const form = reactive({
 name: '',
address: ''
})

const isFormEmpty = computed(() => {
    return !!(form.address && form.name)
})

// const walletOptions = reactive([
//     {
//         option: 'Restrict bookings on public routes',
//         checked: false
//     },
//     {
//         option: 'Restrict booking on public routes with company wallet',
//         checked: true
//     },
//     {
//         option: 'Restrict booking on private routes with personal wallet',
//         checked: false
//     },
//     {
//         option: 'Restrict booking on private routes with company wallet',
//         checked: false
//     }
// ])

const walletOptions = reactive({
	restrict_booking_on_public_routes: false,
	restrict_booking_on_public_routes_with_corporate_wallet: false,
	restrict_booking_on_private_routes_with_personal_wallet: false,
	restrict_booking_on_private_routes_with_corporate_wallet: false
})
let checkedItems = reactive([]) as any
const processWalletOptions = () => {
	const payload = {
		restrict_booking_on_public_routes: ref(false),
		restrict_booking_on_public_routes_with_corporate_wallet: ref(false),
		restrict_booking_on_private_routes_with_personal_wallet: ref(false),
		restrict_booking_on_private_routes_with_corporate_wallet: ref(false),
        verification_password: ref('')
	}
	populateCorporateOptionsForm()
	processCorporatesOptions()
}

const handleChange = (index) => {
      checkedItems = checkedItems.map((item, i) => (i === index ? item : false))
    }
</script>
t
<style>

</style>
