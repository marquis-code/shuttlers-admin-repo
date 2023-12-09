<template>
	<Modal
		modal="$atts.modal"
		title="Apply credit line later"
	>
		<form class="flex flex-col gap-6 gap-y-10" @submit.prevent="proceedToFundWallet">
			<div class="field relative">
				<label for="narration">Narration</label>
				<textarea id="narration" v-model="form.narration" type="text" class="input-field w-full resize-none" rows="6" cols="6" />
			</div>
			<div class="field relative">
				<label for="scheduled_for">Choose date and time to schedule execution</label>
				<InputTimeInput v-model="form.scheduled_for" format="YYYY-MM-DD hh:mm A" date-type="datetime" class="font-light" placeholder="select date" />
			</div>
			<div class="flex items-center gap-x-6 w-full">
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!processingCreditSystemSchedule" class="flex justify-center items-center gap-2.5">
						Proceed
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useScheduleCreditSystem } from '@/composables/modules/corporates/creditLineExecutions'
import { useGetCreditSystem } from '@/composables/modules/corporates/creditLine'
import { useCorporateWalletActivation } from '@/composables/modules/corporates/wallet'
import { useConvertDate } from '@/composables/core/useDateConverter'
const { populateCreditSystemScheduleForm, scheduleCreditSystem, loading: processingCreditSystemSchedule } = useScheduleCreditSystem()
const { creditSystem, getCorporatesCreditSystem } = useGetCreditSystem()
const { convertDateFormat } = useConvertDate()
const { populateWalletActivationForm, activateCorporateWallet, loading } = useCorporateWalletActivation()
const form = reactive({
    scheduled_for: '',
    narration: ''
})
getCorporatesCreditSystem()
  const isFormEmpty = computed(() => {
    return !!(form.narration && form.scheduled_for)
})

const proceedToFundWallet = () => {
    const payload = {
    scheduled: true,
    scheduled_for: convertDateFormat(form?.scheduled_for),
    amount: creditSystem.value?.amount,
    narration: form?.narration
}
populateCreditSystemScheduleForm(payload)
scheduleCreditSystem(creditSystem.value.id)
}
</script>

<style>

</style>
