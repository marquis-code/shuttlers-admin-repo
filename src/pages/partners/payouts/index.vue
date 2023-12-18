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
					}"
					@filter="onFilterUpdate"
				/>
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
import { usePendingPayouts, useMarkAsPaid, useDeductPayout } from '@/composables/modules/partners/payouts'

const { loading, payouts, onFilterUpdate, moveTo, page, total, next, prev, fetchPendingPayouts } = usePendingPayouts()
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
	{ text: 'PAYOUT MONTH', value: 'payout_month' },
	{ text: 'COMPANY NAME', value: 'company_name', width: '50%' },
	{ text: 'EMAIL', value: 'company_email' },
	{ text: 'AMOUNT (₦)', value: 'amount' },
	{ text: 'APPROVAL', value: 'approval' },
	{ text: 'ACTIONS', value: 'action' }
])

const onRowClicked = (data:Record<string, any>) => {
	useRouter().push(`/partners/payouts/${data.partnerNumber}/${data.id}`)
}

</script>

<style scoped></style>
