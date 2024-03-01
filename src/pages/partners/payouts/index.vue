<template>
	<main class="">
		<Table
			:loading="loading"
			:has-index="true"
			:headers="tableFields"
			:table-data="payouts"
			:page="page"
			:has-options="true"
			:option="onRowClicked"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showSearchBar: true,
						showDateRange: true,
						showDownloadButton: true,
						dateType: 'month',
						dateFormat: 'YYYY-MM'
					}"
					@filter="onFilterUpdate"
					@download="downloadPayouts"
				/>
			</template>
			<template #sub_header>
				<ModulesPartnersPayoutsEarningsGrid :obj="payoutsMeta" :loading="loading" />
			</template>
			<template #item="{ item }">
				<p v-if="item.name" class="text-sm whitespace-nowrap">
					{{ item.data?.owner?.fname || '' }} {{ item.data?.owner?.lname || 'N/A' }}
				</p>
				<p v-if="item.payout_month" class="text-sm whitespace-nowrap">
					{{ item.data?.referenceTime ? moment(item.data.referenceTime).format('MMMM, YYYY') : 'N/A' }}
				</p>
				<p v-if="item.approval" class="text-sm whitespace-nowrap">
					{{ item.data.approvalsCount || 0 }}/2
				</p>
				<p v-if="item.amount" class="text-sm whitespace-nowrap">
					{{ item.data?.amount ? convertToCurrency(item.data?.amount) : 0 }}
				</p>
				<p v-if="item.deduction" class="text-sm whitespace-nowrap">
					{{ item.data?.totalDeduction ? convertToCurrency(item.data?.totalDeduction) : 0 }}
				</p>
				<p v-if="item.net" class="text-sm whitespace-nowrap">
					{{ convertToCurrency((item.data?.totalDeduction || 0) + (item.data?.amount || 0)) }}
				</p>
				<span v-if="item.action">
					<ButtonIconDropdown :index="item.index" :children="dropdownChildren" :data="item.data" class-name="w-40" />
				</span>
			</template>

			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loading"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { convertToCurrency } from '@/composables/utils/formatter'
import { usePendingPayouts, useMarkAsPaid, useDeductPayout } from '@/composables/modules/partners/payouts'

const { loading, payouts, payoutsMeta, onFilterUpdate, moveTo, page, total, next, prev, fetchPendingPayouts, downloadPayouts } = usePendingPayouts()
const { initMarkAsPaid } = useMarkAsPaid()
const { initDeduct } = useDeductPayout()
fetchPendingPayouts()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Mark as paid', func: (data) => { initMarkAsPaid(data) } },
	{ name: 'Deduct', func: (data) => { initDeduct(data) }, class: '!text-red' }
])

const tableFields = ref([
	{ text: 'PARTNER NAME', value: 'name' },
	{ text: 'COMPANY NAME', value: 'company_name' },
	{ text: 'EMAIL', value: 'company_email' },
	{ text: 'PAYOUT MONTH', value: 'payout_month' },
	{ text: 'AMOUNT EARNED (₦)', value: 'amount' },
	{ text: 'Deduction (₦)', value: 'deduction' },
	{ text: 'Net Revenue (₦)', value: 'net' },
	{ text: 'APPROVAL', value: 'approval' },
	{ text: 'ACTIONS', value: 'action' }
])

const onRowClicked = (data:Record<string, any>) => {
	useRouter().push(`/partners/payouts/${data.partnerNumber}/${data.id}`)
}

</script>

<style scoped></style>
