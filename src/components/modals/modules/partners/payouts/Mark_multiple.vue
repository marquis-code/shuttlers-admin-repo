<template>
	<Modal
		modal="$atts.modal"
		title="Mark multiple revenue as paid"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="markMultipleRevenueAsPaid">
			<div class="flex flex-col gap-2">
				<label class="label">Select date range</label>
				<InputDateInput v-model="dateRange" range placeholder="Filter by date" :disabled-date="()=>null" clearable />
			</div>
			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Proceed' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useMarkRevenueAsPaid } from '@/composables/modules/partners/payouts/details'

const { loading, dateRange, markMultipleRevenueAsPaid } = useMarkRevenueAsPaid()
const enableButton = computed(() => {
	return !!(dateRange.value[0] && dateRange.value[1])
})
onBeforeUnmount(() => dateRange.value = [])
</script>

<style scoped>
label{
	margin: 0;
}
</style>
