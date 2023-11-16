<template>
	<Modal
		modal="$atts.modal"
		title="Mark charges as remitted"
	>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Date range</label>
				<!-- <date-picker :range="true" v-model="remit_date" valueType="format" placeholder="Filter by date"></date-picker> -->
				<InputDateInput v-model="date" range placeholder="Filter by date" :disabled-date="()=>null" clearable />
			</div>
			<Skeleton v-if="loading_total" height="25px" />
			<div v-else class="flex items-center justify-between text-sm font-medium py-3">
				<p class="text-[#6E717C]">
					Total VAT
				</p>
				<p class="text-[#313533]">
					₦{{ totalCharge }}
				</p>
			</div>
			<div class="flex items-start gap-2">
				<img src="@/assets/icons/source/info_2.svg" class="shrink-0 w-[15px] mt-1" alt="">
				<p class="text-sm text-[#575A65]">
					Charges within the specified date period should only be marked as 'remitted' if the additional charges have been submitted to the official body.
				</p>
			</div>

			<button :disabled="!date[0] && !date[1]" class="w-full p-[16px] text-white bg-black rounded border-none outline-none text-sm mt-2 disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
				@click="initRemit()"
			>
				Mark as remitted
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useRemitted } from '@/composables/modules/configure/charges/configure/index'

const { date, closeMarkAsRemittedModal, initRemit, getTotalCharges, totalCharge, loading_total } = useRemitted()
onBeforeUnmount(() => closeMarkAsRemittedModal())
getTotalCharges()
</script>

<style scoped>
label{
	margin: 0;
}
</style>
