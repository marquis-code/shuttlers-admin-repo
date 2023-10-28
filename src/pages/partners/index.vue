<template>
	<main class="">
		<Table :loading="fetchingPartners" :headers="tableFields" :table-data="formattedPartnersList" :option="onRowClicked" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true }" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.status">
					<StatusBadge :name="item.data.status" />
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
					{{ item.data.table_index }}
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="fetchingPartners" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetPartnersList } from '@/composables/modules/partners/fetch'
import { usePartnerIdDetails } from '@/composables/modules/partners/id'

const { getPartnersList, loading: fetchingPartners, partnersList, moveTo, total, page, next, prev, onFilterUpdate } = useGetPartnersList()
getPartnersList()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const formattedPartnersList = computed(() => {
	if (!partnersList.value.length) return []
	return partnersList.value.map((item, index) => {
		return {
			...item,
			name: `${item.owner.fname} ${item.owner.lname}` ?? 'N/A',
			email: `${item.owner.email}` ?? 'N/A',
			date_created: item.created_at ?? 'N/A',
			table_index: index + 1,
			status: item.status
		}
	})
})

const onRowClicked = (data) => {
	const { selectedPartner } = usePartnerIdDetails()
	useRouter().push(`/partners/${data?.id}/${data?.account_sid}/partner-info`)
	selectedPartner.value = data
}

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
		value: 'vehicles_count'
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
