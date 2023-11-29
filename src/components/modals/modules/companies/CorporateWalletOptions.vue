<template>
	<Modal
		modal="$atts.modal"
		title="Corporate Wallet Options"
		class="!text-sm"
	>
		<form class="space-y-6" @submit.prevent="processWalletOptions">
			<div class="space-y-6">
				<label v-for="(itm, idx) in walletOptions" :key="idx" :for="itm.option">
					<input id="" v-model="checkedItems[idx]" :checked="itm.checked" type="checkbox" class=" pr-4" @change="handleChange(idx)">
					{{ itm.option }}
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
import { useCompaniesModal } from '@/composables/core/modals'
const form = reactive({
 name: '',
address: ''
})

const isFormEmpty = computed(() => {
    return !!(form.address && form.name)
})

const walletOptions = reactive([
    {
        option: 'Restrict bookings on public routes',
        checked: false
    },
    {
        option: 'Restrict booking on public routes with company wallet',
        checked: true
    },
    {
        option: 'Restrict booking on private routes with personal wallet',
        checked: false
    },
    {
        option: 'Restrict booking on private routes with company wallet',
        checked: false
    }
])
let checkedItems = reactive([]) as any
const processWalletOptions = () => {

}

const handleChange = (index) => {
      checkedItems = checkedItems.map((item, i) => (i === index ? item : false))
    }
</script>
t
<style>

</style>
