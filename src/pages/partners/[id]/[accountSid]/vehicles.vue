<template>
	<main>
		<Table :loading="loading" :headers="tableFields" :table-data="formattedPartnersVehiclesList" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true, showDownloadButton:true, }" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.status" class="text-xs text-white rounded-lg py-1.5 px-2.5">
					<StatusBadge :name="item.data.status" />
				</span>
				<div v-if="item.vehicle" class="flex items-center gap-x-2">
					{{ item.data.vehicle }}
				</div>
				<div v-if="item.driver" class="flex items-center gap-x-2">
					{{ item.data.driver }}
				</div>
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.id">
					{{ item.data.table_index }}
				</span>
				<span v-else-if="item.code">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
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
import { useGetPartnersVehiclesList } from '@/composables/modules/partners/id'
const { getPartnersVehiclesList, loading, partnersVehiclesList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetPartnersVehiclesList()
const id = Number(useRoute().params.id)
getPartnersVehiclesList(id)
filterData.status.value = useRoute().query.status === '1' ? 'active' : 'inactive'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const formattedPartnersVehiclesList = computed(() => {
	if (!partnersVehiclesList.value.length) return []
	return partnersVehiclesList.value.map((item, index) => {
		return {
			...item,
			vehicle: `${item?.brand} ${item?.name}` ?? 'N/A',
			driver: item.driver.fname || item.driver.lname ? `${item?.driver?.fname} ${item?.driver?.lname}` : 'No driver assigned',
			table_index: index + 1
		}
	})
})

const dropdownChildren = computed(() => [
	{ name: 'View details', func: (data) => { useRouter().push(`/fleets/${data.user_id}/past-bookings/${data.trip_id}`) } },
	{ name: 'Unassign vehicle', func: (data) => setDeleteRefundId(data.id), class: '!text-red' }
])

const tableFields = ref([
	{
		text: 'S/N',
		value: 'id',
		width: '10%'
	},
	{
		text: 'VEHICLE',
		value: 'name'
	},
	{
		text: 'PLATE NUMBER',
		value: 'registration_number'
	},
	{
		text: 'CAPACITY',
		value: 'seats'
	},
	{
		text: 'TYPE',
		value: 'type'
	},
	{
		text: 'DRIVER',
		value: 'driver'
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
		value: 'code'
	}
])

</script>

<style scoped></style>
