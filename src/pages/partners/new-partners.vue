<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="formatedRefundList" :has-index="true" :page="page">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true, showDateRange: true, showDownloadButton: true }"
					@filter="onFilterUpdate" @download="downloadNewPartners"
				/>
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
					<!-- {{ useDateFormat(item.data.date_created, "MMMM d, YYYY").value }} -->
					{{ moment(item.data.date_created).format('LL') }}
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
import moment from 'moment'
import { useDateFormat } from '@vueuse/core'
import { useGetNewPartnersList } from '@/composables/modules/partners/fetch'

const { getNewPartnersList, loading, newPartnersList, onFilterUpdate, moveTo, total, page, next, prev, downloadNewPartners } = useGetNewPartnersList()
// getNewPartnersList()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const formatedRefundList = computed(() => {
	if (!newPartnersList.value.length) return []
	return newPartnersList.value.map((item, index) => {
		return {
			name: `${item.owner.fname} ${item.owner.lname}` ?? 'N/A',
			company_name: `${item.company_name}` ?? 'N/A',
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
		text: 'Name',
		value: 'name'
	},
	{
		text: 'Company Name',
		value: 'company_name'
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
