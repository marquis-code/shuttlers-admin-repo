<template>
	<Modal
		modal="$atts.modal"
		:title="isDeductFromRevenue ? 'Deduct from Revenue' : 'Deduct Payout'"
	>
		<form class="flex flex-col gap-[16px] w-full" @submit.prevent="isDeductFromRevenue ? deductRevenue() : deduct()">
			<div class="field gap-2">
				<span class="label">Deduction type</span>
				<div class="flex items-center w-full">
					<label for="default" class="flex-1">
						<input id="default" value="default" type="radio" name="type">
						Default deduction
					</label>
					<label for="wht" class="flex-1">
						<input id="wht" type="radio" value="wht" name="type">
						WHT
					</label>
				</div>
			</div>

			<div class="flex flex-col gap-2 mt-4">
				<label class="label">Deducted amount</label>
				<input v-model="amount" required type="number" class="input-field">
				<p v-if="amount && amount > total_amount!" class="text-xs font-medium text-red">
					Amount is larger than payslip total
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Description</label>
				<textarea v-model.trim="desc" required placeholder="Write a short description about this deduction" class="input-field max-h-[100px]" cols="20" rows="10" />
			</div>

			<div class="border border-[#FFED80] bg-[#FFFCEB] text-[#B89E00] p-4 text-sm rounded-lg">
				WHT should be the last deduction on a monthly earning. Please confirm that you have deducted other necessary deductions before proceeding as you will not be able to deduct from this earning after making a WHT deduction.
			</div>

			<div class="flex flex-col gap-2">
				<label class="label font-bold">Type in YES to confirm this action</label>
				<input v-model="yes_text" required type="text" class="input-field">
				<p v-if="yes_text.length && yes_text !== 'YES'" class="text-xs font-medium text-red">
					Wrong input
				</p>
			</div>
			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : `${isDeductFromRevenue ? 'Deduct Revenue' : 'Deduct'}` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useDeductPayout } from '@/composables/modules/partners/payouts'

const { loading, clearObj, amount, total_amount, desc, yes_text, deduct, isDeductFromRevenue, deductRevenue } = useDeductPayout()
const enableButton = computed(() => {
	return !!(amount.value && amount.value < total_amount.value! && yes_text.value === 'YES')
})
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
