import { formToJSON } from 'axios';
<template>
	<Modal
		modal="$atts.modal"
		title="Configure point"
		:no-close-btn="true"
		class="text-center"
	>
		<div class="flex flex-col items-center justify-center">
			<div class="field relative">
				<label for="amount" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Naira equivalent</label>
				<input id="amount" v-model="form.amount" placeholder="₦" autocomplete="true" type="number" class="input-field" required>
			</div>
			<div class="bg-[#F4F5F4] flex justify-between items-center py-3 rounded-lg px-[12px] w-full mt-3">
				<p class="text-[#6E717C] font-extralight leading-[21px] text-[14px]">
					{{ Math.round(Number(form.amount) / 50) }} point
				</p>
				<p>~</p>
				<p class="text-[#6E717C] font-extralight leading-[21px] text-[14px]">
					{{ convertToCurrency(Number(form.amount)) }}
				</p>
			</div>
			<button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : null]" class="auth-form-btn font-[700] w-full py-3 text-white mt-6 bg-[#000005]" @click="handlePointConfiguration">
				<span v-if="!loading" class="flex justify-center items-center gap-2.5">Configure</span>
				<Spinner v-else />
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useCampaignModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'
import { convertToCurrency } from '@/composables/utils/formatter'
import { use_configure_point } from '@/composables/modules/campaigns/fetch'
const { payloads, configurePoint, loading } = use_configure_point()
const isFormEmpty = computed(() => {
	return !!(form.amount)
})
const form = reactive({
    amount: ''
})

const computedPoint = computed(() => {
	return Math.round(Number(form.amount) / 50)
})

const handlePointConfiguration = async () => {
	payloads.value.value = form.amount
	payloads.min_point.value = String(computedPoint.value)
    payloads.currency.value = 'NGN'
	await configurePoint()
	useCampaignModal().closeConfigurePoints()
	useAlert().openAlert({ type: 'SUCCESS', msg: 'New Point has been created successfully' })
}

</script>

<style>

</style>
