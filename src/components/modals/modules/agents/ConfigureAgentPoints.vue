<template>
	<Modal
		modal="$atts.modal"
		title="Configure Currency"
		:no-close-btn="true"
		class="text-center"
	>
		<form class="flex flex-col items-center justify-center" @submit.prevent="confirm">
			<div class="field relative">
				<label for="amount" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Naira equivalent</label>
				<input id="amount" v-model="rate" :placeholder="(currenciesLoading || rateLoading)? 'loading...' : '₦'" :disabled="currenciesLoading || rateLoading" type="number" class="input-field" required>
			</div>
			<div class="bg-[#F4F5F4] flex justify-between items-center py-3 rounded-lg px-[12px] w-full mt-3">
				<p class="text-[#6E717C] font-extralight leading-[21px] text-[14px]">
					1 point
				</p>
				<p>~</p>
				<p v-if="!rateLoading" class="text-[#6E717C] font-extralight leading-[21px] text-[14px]">
					{{ convertToCurrency(Number(rate)) }}
				</p>
				<p v-else class="text-[#6E717C] font-extralight leading-[21px] text-[14px]">
					loading...
				</p>
			</div>
			<button :disabled="!rate" class="btn-primary mt-12 w-full">
				<span v-if="!loading" class="flex justify-center items-center gap-2.5">Configure</span>
				<Spinner v-else />
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">

import { convertToCurrency } from '@/composables/utils/formatter'
import { useGetCurrencies, useCreateSwapConfiguration, useGetCurrentRatesForAgent } from '@/composables/modules/agents/configure'

const { getCurrencies, loading: currenciesLoading } = useGetCurrencies()
const { loading, confirm, rate } = useCreateSwapConfiguration()
const { rateData, rateLoading, getRateForAgent } = useGetCurrentRatesForAgent()

getCurrencies()
getRateForAgent()

watch(rateData, (val:any) => {
	if (val.rate) {
		rate.value = val.rate
	} else {
		rate.value = 0
	}
})

</script>

<style>

</style>
