<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
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
				>
					<template #filter_others>
						<div class="flex items-stretch border rounded-xl text-grey5_5 overflow-hidden">
							<p class="p-3 text-sm border-r">
								Earning cycle
							</p>
							<select class="capitalize w-fit px-2 bg-white font-medium focus:outline-none pr-6">
								<option v-for="n in ['all', 'weekly', 'monthly']" :key="n" :value="n">
									{{ n }}
								</option>
							</select>
						</div>
					</template>
				</TableFilter>
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
				<p v-if="item.earning_cycle" class="text-sm whitespace-nowrap capitalize" :class="item.data?.payoutType === 'monthly' ? 'badge-blue' : 'badge-green'">
					{{ item.data?.payoutType }}
				</p>
				<p v-if="item.period" class="text-sm min-w-[100px]">
					{{ item?.data?.earningPeriod?.start ? moment(item?.data?.earningPeriod?.start).format('ll') : 'N/A' }} - {{ item?.data?.earningPeriod?.end ? moment(item?.data?.earningPeriod?.end).format('ll') : 'N/A' }}
				</p>
				<p v-if="item.approval" class="text-sm whitespace-nowrap">
					{{ item.data.approvalsCount || 0 }}/3
				</p>
				<p v-if="item.amount" class="text-sm whitespace-nowrap">
					{{ item.data?.amount ? convertToCurrency(item.data?.amount) : 0 }}
				</p>
				<p v-if="item.deduction" class="text-sm text-red whitespace-nowrap">
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
	{ text: 'Earning cycle', value: 'earning_cycle' },
	{ text: 'PAYOUT PERIOD', value: 'period' },
	// { text: 'PAYOUT MONTH', value: 'payout_month' },
	{ text: 'Net Revenue (₦)', value: 'net' },
	{ text: 'Deduction (₦)', value: 'deduction' },
	{ text: 'AMOUNT EARNED (₦)', value: 'amount' },
	{ text: 'APPROVAL', value: 'approval' },
	{ text: 'ACTIONS', value: 'action' }
])

const onRowClicked = (data:Record<string, any>) => {
	useRouter().push(`/partners/payouts/${data.partnerNumber}/${data.id}`)
}

</script>

<style scoped></style>
