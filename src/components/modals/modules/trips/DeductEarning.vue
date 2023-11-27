<template>
	<Modal
		modal="$atts.modal"
		title="Deduct From Revenue"
		:no-close-btn="true"
		class="text-center"
	>
		<div class="flex flex-col items-center justify-center space-y-6">
			<p class="text-sm">
				You are about to deduct from a Partners account
			</p>
			<div class="field relative">
				<label for="amount" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Amount</label>
				<input id="amount" v-model="deductionForm.amount" placeholder="₦" autocomplete="true" type="number" class="input-field" required>
			</div>
			<div class="field relative">
				<label for="description" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Description</label>
				<textarea id="description" v-model="deductionForm.description" rows="6" cols="6" placeholder="Enter reason for deducton" class="input-field resize-none" required />
			</div>
		</div>
		<div class="flex justify-between items-center gap-x-6 mt-6">
			<div class="w-full">
				<button class="text-white bg-gray-500 w-full rounded-md py-2.5" @click="useTripsModal().closeDeductEarning()">
					Close
				</button>
			</div>
			<div class="w-full">
				<button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : null]" class="font-[700] w-full py-2.5 text-white flex justify-center items-center rounded-md bg-[#000005]" @click="handleDeduction">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">Proceed</span>
					<Spinner v-else />
				</button>
			</div>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useTripsModal } from '@/composables/core/modals'
import { useDeductEarning } from '@/composables/modules/trips/create'
const { loading, deductPartnerEarning, prePopulateDeductionForm } = useDeductEarning()
const isFormEmpty = computed(() => {
	return !!(deductionForm.amount && deductionForm.description)
})

const deductionForm = reactive({
    amount: '',
    description: ''
})

const handleDeduction = async () => {
    prePopulateDeductionForm(deductionForm)
    deductPartnerEarning()
}

</script>

<style>

</style>
