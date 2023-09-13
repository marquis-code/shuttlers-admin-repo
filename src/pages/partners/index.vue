<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="formatedRefundList">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true }" />
			</template>
			<template #item="{ item }">
				<span v-if="item.status" class="text-xs text-white rounded-lg" :class="[item.data.status === 'active' ? 'bg-green-500 px-3 py-1' : 'bg-red-500 px-3 py-1 ']">
					{{ item.data.status }}
				</span>
				<div v-if="item.name" class="flex items-center gap-x-2">
					<p><Avatar :name="item.data.name" bg="#B1C2D9" /></p> <p class="text-gray-700">{{ item.data.name }}</p>
				</div>
				<span v-if="item.date_created">
					{{ useDateFormat(item.data.date_created, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.id">
					{{ item.data.id }}
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetPartnersList } from '@/composables/modules/partners/fetch'

const { getPartnersList, loading, partnersList, filterData, onFilterUpdate, moveTo, total, page, next, prev } = useGetPartnersList()
getPartnersList()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const formatedRefundList = computed(() => {
	if (!partnersList.value.length) return []
	return partnersList.value.map((item, index) => {
		return {
			name: `${item.owner.fname} ${item.owner.lname}` ?? 'N/A',
			email: `${item.owner.email}` ?? 'N/A',
			vehicle_count: item.vehicles_count ?? 'N/A',
			date_created: item.created_at ?? 'N/A',
			id: index + 1,
			status: item.status
		}
	})
})
const tableFields = ref([
	{
		text: 'S/N',
		value: 'id',
		width: '10%'
	},
	{
		text: 'Name',
		value: 'name'
	},
	{
		text: 'Email',
		value: 'email'
	},
	{
		text: 'Number Of Vehicles',
		value: 'vehicle_count'
	},
	{
		text: 'Date Created',
		value: 'date_created'
	},
	{
		text: 'Status',
		value: 'status'
	}
])

</script>

<style scoped></style>
