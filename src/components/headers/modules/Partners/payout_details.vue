<template>
	<HeadersHeaderSlot pre-title="VEHICLE PARTNER OVERVIEW" :loading="loading_partners">
		<template #title>
			<div class="flex items-center gap-2">
				<h3>
					{{ partnerInfo?.owner?.fname || 'N/A' }} {{ partnerInfo?.owner?.lname }}
				</h3>
				<p class="badge-blue text-sm capitalize">
					{{ partnerInfo?.mode }}
				</p>
				<p class="text-sm font-medium">
					{{ moment(earningInfo?.earningPeriod?.start).format('ll') }} to {{ moment(earningInfo?.earningPeriod?.end).format('ll') }}
				</p>
			</div>
		</template>
		<template #actions>
			<div class="flex items-stretch gap-4">
				<button v-if="earningInfo.status !== 'settled'" class="text-sm text-dark p-2 px-4 border border-dark rounded font-medium" @click="deduct()">
					Deduct from earnings
				</button>
				<button v-if="earningInfo.status !== 'settled'" class="text-sm text-dark p-2 px-4 border border-dark rounded font-medium" @click="markAsPaid()">
					Mark as paid
				</button>
				<button v-if="canApprove" class="text-sm bg-dark text-light p-2 px-4 rounded font-medium" @click="initApprove()">
					{{ approvers?.length === 2 ? 'Approve and disburse' : 'Approve' }}
				</button>
				<button v-if="canRetry" class="text-sm bg-dark text-light p-2 px-4 rounded font-medium" @click="initRetry()">
					Retry
				</button>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useMarkAsPaid, useDeductPayout } from '@/composables/modules/partners/payouts'
import { usePayoutDetails, useApprove, useRetry } from '@/composables/modules/partners/payouts/details'

const { loading_partners, partnerInfo, earningInfo, approvers } = usePayoutDetails()

const { initDeduct } = useDeductPayout()
const { initMarkAsPaid } = useMarkAsPaid()
const { initApprove } = useApprove()
const { initRetry } = useRetry()

const deduct = () => {
	const data = {
		id: useRoute().params.earningId as string,
		amount: earningInfo.value.netRevenue,
		earningInfo: earningInfo.value,
		account_sid: partnerInfo.value?.account_sid
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
