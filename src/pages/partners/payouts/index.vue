<template>
	<main class="">
		<Table :loading="loadingPayouts" :headers="tableFields" :table-data="formatedPayoutList" :has-index="true" :page="page">
			<template #header>
				<TableFilter :filter-type="{ showStatus: false, showSearchBar: true, showDatePicker: true }" />
			</template>
			<template #item="{ item }">
				<span v-if="item.createdAt">
					{{ useDateFormat(item.data.createdAt, "MMMM, YYYY").value }}
				</span>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingPayouts" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useGetPartnerPayoutList } from '@/composables/modules/partners/fetch'

const { getPartnersPayoutList, loadingPayouts, partnersPayoutList, filterData, onFilterUpdate, moveTo, page, total, next, prev } = useGetPartnerPayoutList()
getPartnersPayoutList()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const formatedPayoutList = computed(() => {
	if (!partnersPayoutList?.value.length) return []
	return partnersPayoutList?.value.map((item, index) => {
		return {
			...item,
			name: `${item?.owner?.fname} ${item?.owner?.lname}`,
			action: ''
		}
	})
})

const dropdownChildren = computed(() => [
	{ name: 'Mark as paid', func: (data) => {} },
	{ name: 'Deduct', func: (data) => {}, class: '!text-red' }
])

const tableFields = ref([
	{
		text: 'PARTNER NAME',
		value: 'name'
	},
	{
		text: 'PAYOUT MONTH',
		value: 'createdAt'
	},
	{
		text: 'COMPANY NAME',
		value: 'company_name'
	},
	{
		text: 'EMAIL',
		value: 'company_email'
	},
	{
		text: 'AMOUNT (₦)',
		value: 'amount'
	},
	{
		text: 'APPROVAL',
		value: 'approvalsCount'
	},
	{
		text: 'ACTIONS',
		value: 'action'
	}
])

</script>

<style scoped></style>
