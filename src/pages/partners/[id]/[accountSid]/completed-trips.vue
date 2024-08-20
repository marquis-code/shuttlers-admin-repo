<template>
	<main>
		<ButtonGoBack url="/partners" class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :has-index="true" :table-data="formattedPartnersCompletedTripsList" :page="page" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{ showStatus: false, showSearchBar: true }" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<p v-if="item.status" class="text-xs text-white rounded-lg py-1.5 w-14 text-center" :class="[item.data.status ? 'bg-green-500 py-1' : 'bg-yellow-500 py-1 ']">
					{{ item.data.status === false ? 'Not settled' : 'Settled' }}
				</p>
				<div v-if="item.date_of_creation" class="flex items-center gap-x-2">
					{{ item.data.date_of_creation }}
				</div>
				<div v-if="item.driver" class="flex items-center gap-x-2">
					<img src="@/assets/icons/source/vehicle_icon.svg" alt="vehicle icon">
					<div>
						<p class="font-medium">
							{{ item.data.driver ?? 'No driver assigned' }}
						</p>
						<p>
							<NuxtLink class="text-blue-500" to="/">
								{{ item.data.vehicle }}
							</NuxtLink>
						</p>
					</div>
				</div>
				<div v-if="item.route" class="flex items-center gap-x-2">
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.dropoff" />
				</div>
				<span v-if="item.start_time">
					{{ useDateFormat(item.data.start_time, "hh:mm A").value }}
				</span>
				<span v-if="item.createdAt">
					{{ useDateFormat(item.data.createdAt, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.earning">
					{{ convertToCurrency(item.data.earning) }}
				</span>
				<span v-if="item.table_index">
					{{ item.data.table_index }}
				</span>
				<span v-else-if="item.action">
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
import { convertToCurrency } from '@/composables/utils/formatter'
import { useGetPartnersCompletedTripsList } from '@/composables/modules/partners/id'
const { getPartnersCompletedTrips, loading, partnersCompletedTripsList, filterData, onFilterUpdate, moveTo, next, prev, page, total } = useGetPartnersCompletedTripsList()
const id = useRoute().params.accountSid as string
// filterData.status.value = useRoute().query.status === '1' ? 'active' : 'inactive'
getPartnersCompletedTrips()
filterData.isSettled.value = false

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Deduct partner earnings', func: (data) => { useRouter().push(`/fleets/${data.user_id}/past-bookings/${data.trip_id}`) } },
	{ name: 'View financials', func: (data) => setDeleteRefundId(data.id), class: '!text-red' }
])

const formattedPartnersCompletedTripsList = computed(() => {
	if (!partnersCompletedTripsList.value.length) return []
	return partnersCompletedTripsList.value.map((item, index) => {
		return {
			...item,
			date_of_creation: `${useDateFormat(item?.createdAt, 'MMMM d, YYYY').value} Marked by: ${item?.metadata?.actor?.fname} ${item?.metadata?.actor?.lname}`,
			route_code: item?.metadata?.routeCode,
			pickup: item?.metadata?.pickup,
			dropoff: item?.metadata?.dropoff,
			route: '',
			action: '',
			start_time: item?.tripStartTime,
			vehicle: `${item?.metadata?.vehicle?.brand} ${item?.metadata?.vehicle?.name}`,
			driver: `${item?.metadata?.driver?.fname} ${item?.metadata?.driver?.lname}`,
			earning: item?.finalPartnersRevenue,
			status: item?.isSettled,
			table_index: index + 1
		}
	})
})

const tableFields = ref([
	// {
	// 	text: 'S/N',
	// 	value: 'table_index',
	// 	width: '10%'
	// },
	{
		text: 'TRIP DATE',
		value: 'createdAt'
	},
	{
		text: 'DATE OF CREATION',
		value: 'date_of_creation'
	},
	{
		text: 'START TIME',
		value: 'start_time'
	},
	{
		text: 'DRIVER',
		value: 'driver'
	},
	{
		text: 'ROUTE',
		value: 'route'
	},
	{
		text: 'ROUTE CODE',
		value: 'route_code'
	},
	{
		text: 'EARNINGS',
		value: 'earning'
	},
	{
		text: 'STATUS',
		value: 'status'
	},
	{
		text: 'ACTIONS',
		value: 'action'
	}
])

</script>

<style scoped></style>
