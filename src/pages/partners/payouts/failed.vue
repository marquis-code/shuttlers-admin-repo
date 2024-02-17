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
					{{ item.data.owner.fname || '' }} {{ item.data.owner.lname || '' }}
				</p>
				<p v-if="item.payout_month" class="text-sm whitespace-nowrap">
					{{ item.data.referenceTime ? moment(item.data.referenceTime).format('MMMM, YYYY') : 'N/A' }}
				</p>
				<p v-if="item.approval" class="text-sm whitespace-nowrap">
					{{ item.data.approvalsCount || 0 }}/2
				</p>
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
import { useFailedPayouts } from '@/composables/modules/partners/payouts/failed'

const { loading, payouts, payoutsMeta, onFilterUpdate, moveTo, page, total, next, prev, fetchFailedPayouts, downloadPayouts } = useFailedPayouts()
fetchFailedPayouts()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
	{ text: 'PARTNER NAME', value: 'name' },
	{ text: 'PAYOUT MONTH', value: 'payout_month' },
	{ text: 'COMPANY NAME', value: 'company_name', width: '50%' },
	{ text: 'EMAIL', value: 'company_email' },
	{ text: 'AMOUNT (₦)', value: 'amount' },
	{ text: 'APPROVAL', value: 'approval' }
])

const onRowClicked = (data:Record<string, any>) => {
	useRouter().push(`/partners/payouts/${data.partnerNumber}/${data.id}`)
}

</script>

<style scoped></style>
