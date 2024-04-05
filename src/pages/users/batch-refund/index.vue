<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<TableSelectedTray class="mb-12" :selected="log_ids" :loading="processLoading" :call-function="getConfirmation" :computed-name-function="formattedName" @update="log_ids = ($event)" />
		<Table :loading="loading" :headers="tableFields" :selected="log_ids" :table-data="formatedRefundList" :checkbox="true" @checked="handleCheckedItems">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true }" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.status" class="text-xs text-white rounded-lg" :class="[item.data.status === 'processed' ? 'bg-green-500 px-3 py-1' : 'bg-red-500 px-3 py-1 ']">
					{{ item.data.status }}
				</span>
				<span v-else-if="item.id">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-40" />
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
import { useDeleteRefund } from '@/composables/modules/users/batch-refund/delete'
import { useGetBatchRefundList } from '@/composables/modules/users/batch-refund/fetch'
import { useProcessBatchRefund } from '@/composables/modules/users/batch-refund/create'

const { setDeleteRefundId } = useDeleteRefund()
const { loading: processLoading, log_ids, getConfirmation, formattedName } = useProcessBatchRefund()
const { getBatchRefundList, loading, refundList, next, moveTo, onFilterUpdate, prev, total, page } = useGetBatchRefundList()
getBatchRefundList()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const formatedRefundList = computed(() => {
	if (!refundList.value.length) return []
	return refundList.value.map((item) => {
		return {
			...item,
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
	{ name: 'Trip details', func: (data) => { useRouter().push(`/users/${data.user_id}/past-bookings/${data.trip_id}`) } },
	{ name: 'Delete log', func: (data) => setDeleteRefundId(data.id), class: '!text-red' }
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

const handleCheckedItems = (val:Record<string, any>) => {
	if (!log_ids.value.map((el) => el?.id).includes(val?.id)) {
		log_ids.value.push(val)
	} else {
		const index = log_ids.value.map((el) => el?.id).indexOf(val?.id)
		log_ids.value.splice(index, 1)
	}
}

</script>

<style scoped></style>
