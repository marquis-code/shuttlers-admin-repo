<template>
	<Modal
		modal="$atts.modal"
		:title="partnerDeductionObj.isDeductFromRevenue.value ? 'Deduct from Revenue' : 'Earnings deduction'"
		@close="clearObj()"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="partnerDeductionObj.isDeductFromRevenue.value ? deductRevenue() : deduct()">
			<section v-if="form_step === 1" class="flex flex-col gap-4 w-full">
				<div class="field gap-2">
					<span class="label">Deduction type</span>
					<div class="flex items-center w-full">
						<label for="default" class="flex-1">
							<input id="default" v-model="partnerDeductionObj.type.value" value="default" type="radio" name="type">
							Default deduction
						</label>
						<label v-if="!partnerDeductionObj.isDeductFromRevenue.value" for="wht" class="flex-1">
							<input id="wht" v-model="partnerDeductionObj.type.value" type="radio" value="wht" name="type">
							Withholding Tax Deduction
						</label>
					</div>
				</div>

				<div v-if="partnerDeductionObj.type.value === 'default'" class="flex flex-col gap-2 mt-4">
					<label class="label">Deducted amount</label>
					<input v-model="partnerDeductionObj.amount.value" required type="number" class="input-field">
					<p v-if="partnerDeductionObj.amount.value && partnerDeductionObj.amount.value > partnerDeductionObj.total_amount.value!" class="text-xs font-medium text-red">
						Amount is larger than payslip total
					</p>
				</div>

				<div v-else class="flex flex-col gap-2 mt-4">
					<label class="label">Enter percentage(%)</label>
					<input v-model="partnerDeductionObj.percentage.value" required type="number" class="input-field" minlength="3" min="1" max="100">
				</div>

				<div class="flex flex-col gap-2">
					<label class="label">Description</label>
					<textarea v-model.trim="partnerDeductionObj.desc.value" :disabled="partnerDeductionObj.type.value === 'wht'" required placeholder="Write a short description about this deduction" class="input-field max-h-[100px]" cols="20" rows="10" />
				</div>

				<div v-if="partnerDeductionObj.type.value === 'wht'" class="border border-[#FFED80] bg-[#FFFCEB] text-[#B89E00] p-4 text-sm rounded-lg">
					WHT should be the last deduction on a monthly earning. Please confirm that you have deducted other necessary deductions before proceeding.
				</div>

				<div v-if="partnerDeductionObj.type.value === 'default'" class="flex flex-col gap-2">
					<label class="label font-bold">Type in YES to confirm this action</label>
					<input v-model="partnerDeductionObj.yes_text.value" required type="text" class="input-field">
					<p v-if="partnerDeductionObj.yes_text.value.length && partnerDeductionObj.yes_text.value !== 'YES'" class="text-xs font-medium text-red">
						Wrong input
					</p>
				</div>
			</section>

			<section v-if="form_step === 2" class="flex flex-col gap-4 w-full">
				<span class="flex items-center justify-between">
					<p class="text-sm">Amount:</p>
					<p class="text-sm">{{ partnerDeductionObj.percentage.value }}% of {{ convertToCurrency(partnerDeductionObj.data.value.netRevenue!) }}</p>
				</span>

				<hr class="w-full ">

				<span class="flex items-center justify-between">
					<p class="text-sm">WHT Deduction:</p>
					<p class="text-sm font-bold">{{ convertToCurrency(WHT_deducted_amount) }}</p>
				</span>

				<div class="border border-[#FFED80] bg-[#FFFCEB] text-[#B89E00] p-4 text-sm rounded-lg">
					WHT should be the last deduction on a monthly earning. Please confirm that you have deducted other necessary deductions before proceeding.
				</div>

				<div class="flex flex-col gap-2">
					<label class="label font-bold">Type in YES to confirm this action</label>
					<input v-model="partnerDeductionObj.yes_text.value" required type="text" class="input-field">
					<p v-if="partnerDeductionObj.yes_text.value.length && partnerDeductionObj.yes_text.value !== 'YES'" class="text-xs font-medium text-red">
						Wrong input
					</p>
				</div>
			</section>
			<footer class="flex w-full mt-6 border-t pt-5 gap-4">
				<button type="button" class="btn-outline w-full" @click="form_step === 1 ? usePayoutModal().closeDeductPayout() : (form_step = 1)">
					Go back
				</button>
				<button v-if="partnerDeductionObj.type.value === 'default' || form_step === 2" type="submit" :disabled="loading || !enableButton" class="modal-btn">
					{{ loading ? 'processing...' : `${partnerDeductionObj.isDeductFromRevenue.value ? 'Deduct Revenue' : 'Deduct'}` }}
				</button>
				<div v-else class="flex w-full">
					<button type="button" class="modal-btn" @click="form_step = 2">
						Continue
					</button>
				</div>
			</footer>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useDeductPayout } from '@/composables/modules/partners/payouts'
import { convertToCurrency } from '@/composables/utils/formatter'
import { usePayoutModal } from '@/composables/core/modals'

const form_step = ref(1)

const { loading, clearObj, partnerDeductionObj, deduct, deductRevenue, WHT_deducted_amount } = useDeductPayout()
const enableButton = computed(() => {
	return !!(partnerDeductionObj.amount.value && partnerDeductionObj.amount.value < partnerDeductionObj.total_amount.value! && partnerDeductionObj.yes_text.value === 'YES')
})
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
