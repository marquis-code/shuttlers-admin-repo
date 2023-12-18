<template>
	<HeadersHeaderSlot :title="`${partnerInfo.owner?.fname || ''} ${partnerInfo.owner?.lname || ''}`"
		pre-title="VEHICLE PARTNER OVERVIEW" :loading="loading_partners"
	>
		<template #actions>
			<div class="flex items-stretch gap-4">
				<button class="text-sm text-dark p-2 px-4 border border-dark rounded font-medium" @click="deduct()">
					Deduct from earnings
				</button>
				<button class="text-sm text-dark p-2 px-4 border border-dark rounded font-medium" @click="markAsPaid()">
					Mark as paid
				</button>
				<button v-if="canApprove" class="text-sm bg-dark text-light p-2 px-4 rounded font-medium">
					Approve
				</button>
				<button v-if="canRetry" class="text-sm bg-dark text-light p-2 px-4 rounded font-medium">
					Retry
				</button>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useMarkAsPaid, useDeductPayout } from '@/composables/modules/partners/payouts'
import { usePayoutDetails } from '@/composables/modules/partners/payouts/details'

const { loading_partners, partnerInfo, earningInfo } = usePayoutDetails()
const { initDeduct } = useDeductPayout()
const { initMarkAsPaid } = useMarkAsPaid()

const deduct = () => {
	const data = {
		id: useRoute().params.earningId as string,
		amount: earningInfo.value.netRevenue
	}
	initDeduct(data, true)
}

const markAsPaid = () => {
	const data = {
		id: useRoute().params.earningId as string,
		partnerId: partnerInfo.value.account_sid
	}
	initMarkAsPaid(data, true)
}

const canApprove = computed(() => {
	return !!(earningInfo.value.status === 'pending-payout' || earningInfo.value.status === 'pending-settlement')
})

const canRetry = computed(() => {
	return !!(earningInfo.value.status === 'failed')
})
</script>

<style scoped>

</style>
