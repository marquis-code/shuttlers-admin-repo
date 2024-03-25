<template>
	<main>
		<ButtonGoBack url="/partners" class="mb-6" />
		<Table :has-index="true" :page="page" :loading="loadingPartnerVehicles" :headers="tableFields" :table-data="formattedPartnersVehiclesList" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true, showDownloadButton:true, }" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.status" class="text-xs text-white rounded-lg py-1.5 px-2.5">
					<StatusBadge :name="item.data.status" />
				</span>
				<div v-if="item.vehicleInfo" class="flex items-center gap-x-2">
					<NuxtLink :to="`/fleet/${item?.data?.id}/vehicle-info`" class="font-semibold text-blue-600">
						{{ item?.data?.brand }} {{ item?.data?.name }}
					</NuxtLink>
				</div>
				<div v-if="item.vehicleDriver" class="flex items-center gap-x-2">
					<NuxtLink v-if="item?.data?.driver" class="font-semibold text-blue-600" :to="`/drivers/${item?.data?.driver?.id}/driver-info`">
						{{ item?.data?.driver?.fname }} {{ item?.data?.driver?.lname }}
					</NuxtLink>
					<p v-else class="text-sm text-gray-500 font-medium">
						No driver assigned
					</p>
				</div>
				<span v-if="item.created_at">
					{{ useDateFormat(item?.data?.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.id">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingPartnerVehicles" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetPartnersVehiclesList } from '@/composables/modules/partners/id'
const { getPartnersVehiclesList, loadingPartnerVehicles, partnersVehiclesList, onFilterUpdate, moveTo, next, prev, total, page } = useGetPartnersVehiclesList()
const id = Number(useRoute().params.id)
getPartnersVehiclesList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const formattedPartnersVehiclesList = computed(() => {
	if (!partnersVehiclesList.value.length) return []
	return partnersVehiclesList.value.map((item, index) => {
		return {
			...item,
			vehicleInfo: `${item?.brand} ${item?.name}` ?? 'N/A',
			vehicleDriver: item?.driver?.fname || item?.driver?.lname ? `${item?.driver?.fname} ${item?.driver?.lname}` : 'No driver assigned'
		}
	})
})

const dropdownChildren = computed(() => [
	{ name: 'View details', func: (data) => { useRouter().push(`/fleets/${data.user_id}/past-bookings/${data.trip_id}`) } },
	{ name: 'Unassign vehicle', class: '!text-red' }
])

const tableFields = ref([
	{
		text: 'VEHICLE',
		value: 'vehicleInfo'
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
		value: 'vehicleDriver'
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
		value: 'id'
	}
])

</script>

<style scoped></style>
