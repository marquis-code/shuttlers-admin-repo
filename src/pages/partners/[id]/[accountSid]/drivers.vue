<template>
	<main>
		<Table :loading="loading" :headers="tableFields" :table-data="formattedPartnersDriversList" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true, showDownloadButton:true, }" />
			</template>
			<template #item="{ item }">
				<span v-if="item.status" class="text-xs text-white rounded-lg py-1.5 px-2.5">
					<StatusBadge :name="item.data.status" />
				</span>
				<div v-if="item.avatar" class="flex items-center gap-x-2">
					<Avatar :name="item.data.name" bg="#B1C2D9" />
				</div>
				<div v-if="item.name" class="flex items-center gap-x-2">
					{{ item.data.name }}
				</div>
				<div v-if="item.vehicle" class="flex items-center gap-x-2">
					<span>{{ item.data.vehicle }}</span>
					<NuxtLink to="/" class="text-blue-500">{{item.data.plate_number}}</NuxtLink>
				</div>
				<div v-if="item.driver" class="flex items-center gap-x-2">
					{{ item.data.driver ?? 'No driver assigned' }}
				</div>
				<span v-if="item.date_created">
					{{ useDateFormat(item.data.date_created, "MMMM d, YYYY") }}sss
				</span>
				<span v-if="item.id">
					{{ item.data.table_index }}
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
import { useGetPartnersDriversList } from '@/composables/modules/partners/id'
const { getPartnersDriversList, loading, partnersDriversList, filterData, onFilterUpdate, moveTo, total, page, next, prev } = useGetPartnersDriversList()
const id = Number(useRoute().params.accountSid)
getPartnersDriversList(id)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const formattedPartnersDriversList = computed(() => {
	if (!partnersDriversList.value.length) return []
	return partnersDriversList.value.map((item, index) => {
		return {
			...item,
			name: `${item?.driver?.fname} ${item?.driver?.lname}` ?? 'N/A',
			avatar: item?.driver?.fname,
			email: item?.driver?.email,
			phone: item?.driver?.phone,
			vehicle: `${item?.vehicle?.brand} ${item?.vehicle?.name}`,
			plate_number: item?.vehicle?.registration_number,
			created_at: item?.created_at,
			status: item?.driver?.status === 1 ? 'active' : 'inactive',
			table_index: index + 1
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
		text: 'AVATAR',
		value: 'avatar'
	},
	{
		text: 'NAME',
		value: 'name'
	},
	{
		text: 'EMAIL',
		value: 'email'
	},
	{
		text: 'PHONE NUMBER',
		value: 'phone'
	},
	{
		text: 'DATE ADDED',
		value: 'created_at'
	},
	{
		text: 'STATUS',
		value: 'status'
	},
	{
		text: 'ACTIONS',
		value: 'status'
	}
])

</script>

<style scoped></style>
