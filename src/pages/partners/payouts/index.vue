<template>
	<main class="">
		<Table :loading="loadingPayouts" :headers="tableFields" :table-data="formatedPayoutList">
			<template #header>
				<TableFilter :filter-type="{ showStatus: false, showSearchBar: true, showDatePicker: true }" />
			</template>
			<template #item="{ item }">
				<!-- <span v-if="item.createdAt">
					{{ useDateFormat(item.data.date_created, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.id">
					{{ item.data.id }}
				</span> -->
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
			name: `${item.owner.fname} ${item.owner.lname}` ?? 'N/A',
			action: '',
			id: index + 1
		}
	})
})

const dropdownChildren = computed(() => [
	{ name: 'Mark as paid', func: (data) => { useRouter().push(`/fleets/${data.user_id}/past-bookings/${data.trip_id}`) } },
	{ name: 'Deduct', func: (data) => setDeleteRefundId(data.id), class: '!text-red' }
])

const tableFields = ref([
	{
		text: 'S/N',
		value: 'id',
		width: '10%'
	},
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
