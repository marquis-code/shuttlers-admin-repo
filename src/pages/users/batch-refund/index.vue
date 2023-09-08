<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="formatedRefundList">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true }" />
			</template>
			<template #item="{ item }">
				<span v-if="item.status" class="text-xs text-white rounded-lg" :class="[item.data.status === 'processed' ? 'bg-green-500 px-3 py-1' : 'bg-red-500 px-3 py-1 ']">
					{{ item.data.status }}
				</span>
				<span v-else-if="item.id">
					<ButtonIconDropdown :children="dropdownChildren" class-name="w-40" />
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetBatchRefundList } from '@/composables/modules/users/batch-refund/fetch'

const { getBatchRefundList, loading, refundList } = useGetBatchRefundList()
getBatchRefundList()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const formatedRefundList = computed(() => {
	if (!refundList.value.length) return []
	return refundList.value.map((item) => {
		return {
			name: `${item.user.fname} ${item.user.lname}`,
			route: item.route.route_code,
			trip: item.trip.cost_of_supply ?? 'N/A',
			refund: `${item.refund_value} %`,
			reason: item.reason,
			id: item.id
		}
	})
})
const dropdownChildren = computed(() => [
	{ name: 'Trip details', func: () => { } },
	{ name: 'Delete log', func: () => { }, class: '!text-red' }
])
const tableFields = ref([
	{
		text: 'Name',
		value: 'name'
	},
	{
		text: 'Route',
		value: 'route'
	},
	{
		text: 'TRIP (₦)',
		value: 'trip'
	},
	{
		text: 'REFUND (%)',
		value: 'refund'
	},
	{
		text: 'REASON',
		value: 'reason'
	},
	{
		text: '',
		value: 'id',
		width: '10%'
	}
])

</script>

<style scoped></style>
