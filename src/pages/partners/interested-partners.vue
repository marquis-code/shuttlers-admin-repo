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
					<p><Avatar :name="item.data.name" bg="#B1C2D9" /></p> <p class="text-gray-700">
						{{ item.data.name }}
					</p>
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
import { useGetInterestedPartnersList } from '@/composables/modules/partners/fetch'

const { getInterestedPartnersList, loading, interestedPartnersList, filterData, onFilterUpdate, moveTo, total, page, next, prev } = useGetInterestedPartnersList()
getInterestedPartnersList()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const formatedRefundList = computed(() => {
	if (!interestedPartnersList.value.length) return []
	return interestedPartnersList.value.map((item, index) => {
		return {
			name: `${item.fname} ${item.lname}` ?? 'N/A',
			email: `${item.email}` ?? 'N/A',
			company_name: `${item.company_name}` ?? 'N/A',
			phone: item.phone ?? 'N/A',
			id: index + 1
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
		text: 'Name',
		value: 'company_name'
	},
	{
		text: 'Email',
		value: 'email'
	},
	{
		text: 'Phone',
		value: 'phone'
	}
])

</script>

<style scoped></style>
