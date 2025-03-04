<template>
	<main class="">
		<Table :checkbox="true" :loading="loadingCompletedTrips" :headers="tableFields" :table-data="formattedCompletedTripsList" :has-options="true" :option="onRowClicked" :selected="selectedTrips"
			@checked="handleCheckedItems"
		>
			<template #header>
				<section class="flex flex-col gap-4 z-50">
					<TableTripFilter @filter="onFilterUpdate" />
					<div v-if="selectedTrips.length" class="flex items-center justify-between gap-4">
						<div class="flex-grow flex flex-wrap gap-2 items-center">
							<div v-for="n in selectedTrips" :key="n.id" class="bg-gray-500 border-gray-900 rounded p-1 px-3 text-light flex items-center gap-2">
								<p class="text-sm">
									{{ n?.route_code }}
								</p>
								<Icon name="closed" class="text-red w-5 cursor-pointer" @click="handleCheckedItems(n)" />
							</div>
						</div>
						<button class="btn bg-dark text-light p-3 shrink-0" @click="transferMultipleTrip">
							Transfer Trips
						</button>
					</div>
					<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showDateRange:true }" @filter="onFilterUpdate" @download="downloadTrips" />
				</section>
			</template>
			<template #item="{ item }">
				<span v-if="item.idx">
					{{ item.data.idx }}
				</span>
				<span v-if="item.driver" class="text-blue-500 flex gap-1 flex-wrap">
					<NuxtLink :to="`/drivers/${item.data.driver.id}/driver-info`" class="">
						{{
							item.data.driver
								? `${item.data.driver.fname} ${item.data.driver.lname}`
								: item.data.route.driver
									? `${item.data.route.driver.fname} ${item.data.route.driver.lname}`
									: 'N/A'
						}}
					</NuxtLink>
					<span v-if="item.data.driver && item.data.driver.phone">
						<a :href="'tel:' + item.data.driver.phone">{{ item.data.driver
							? item.data.driver.phone.replace(/^0/, '+234') : 'N/A' }}</a>
					</span>
				</span>
				<span v-if="item.route_code">
					<NuxtLink to="/" class="text-blue-500 font-medium">{{ item?.data?.route_code }}</NuxtLink> <span>({{ item?.data?.trip_time }})</span>
				</span>
				<div v-if="item.passengers" class="flex items-center gap-x-2 flex-col justify-center gap--y-2">
					<p>{{ item.data.passengers }}</p>
					<button class="bg-white text-shuttlersGreen border px-2 border-shuttlersGreen rounded-full" @click.stop="router.push(`/trips/type/completed/${item.data.id}/passengers`)">
						View
					</button>
				</div>
				<div v-if="item.route" @click.stop>
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.dropoff" />
				</div>
				<p v-if="item.vehicle" class="min-w-[100px]">
					{{ item.data.vehicle }} <br>
					{{ item.data?.cost_of_supply ? convertToCurrency(item.data?.cost_of_supply) : 'N/A' }}
				</p>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :index="item.index" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingCompletedTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useGetCompletedTripsList } from '@/composables/modules/trips/fetch/completedTrips'
import { useCreateIssues } from '@/composables/modules/trips/issues'
import { useTransferTrip } from '@/composables/modules/trips/transfer'
import { useCompletedTripIdDetails } from '@/composables/modules/trips/id'
import { useUser } from '@/composables/auth/user'
import { isProdEnv } from '@/composables/utils/system'
import { useCancelTrip } from '@/composables/modules/trips/cancel'
import { convertToCurrency } from '@/composables/utils/formatter'
import { useDownloadTrips } from '@/composables/modules/trips/fetch'
import { useAlert } from '@/composables/core/notification'

const { downloadTrips } = useDownloadTrips()
const { user } = useUser()
const { initLogIssues } = useCreateIssues()
const { initTransfer, selectedTrips } = useTransferTrip()
const { initCancelTrip } = useCancelTrip()
const { selectedTrip } = useCompletedTripIdDetails()
const { getCompletedTrips, loadingCompletedTrips, completedTripsList, onFilterUpdate, moveTo, total, page, next, prev } = useGetCompletedTripsList()
getCompletedTrips()
const router = useRouter()

const formattedCompletedTripsList = computed(() =>
completedTripsList.value.map((i:any, index) => {
         return {
             ...i,
             route_code: i?.route?.route_code ?? 'N/A',
			 trip_date: moment(i.trip_start_time).format('LL'),
			 trip_time: i?.route_itinerary?.trip_time ?? 'N/A',
			 pickup: i?.route?.pickup ?? 'N/A',
			 dropoff: i?.route?.destination ?? 'N/A',
			 partner: i?.vehicle?.partner?.company_name ? `${i?.vehicle?.partner?.company_name} (${i?.vehicle?.partner?.company_phone})` : 'N/A',
             vehicle: `${i?.vehicle?.brand} ${i?.vehicle?.name}  (${i?.vehicle?.registration_number})`,
			 passengers: `${i?.passengers_count}/${i?.vehicle.seats}`,
             action: '',
			 idx: index + 1
         }
    })
)

const handleCheckedItems = (val:Record<string, any>) => {
	if (!selectedTrips.value.map((el) => el?.id).includes(val?.id)) {
		if (selectedTrips.value.length === 5) {
			useAlert().openAlert({ type: 'WARNING', msg: 'You can not select more than 5 trips' })
			return
		}
		selectedTrips.value.push(val)
	} else {
		const index = selectedTrips.value.map((el) => el?.id).indexOf(val?.id)
		selectedTrips.value.splice(index, 1)
	}
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'View Financials', func: (data) => { useRouter().push(`/trips/type/completed/${data.id}/financials`) } },
	{ name: 'Log Issue', func: (data) => initLogIssues(data), hide: isProdEnv.value },
	{ name: 'Transfer trip', func: (data) => { initTransfer([data]) }, hide: user.value?.role !== 'super_admin' },
	{ name: 'Cancel trip', func: (data) => { initCancelTrip(data) }, hide: user.value?.role !== 'super_admin' }
])

const transferMultipleTrip = () => {
	initTransfer(selectedTrips.value, true)
}

const onRowClicked = (data: any) => {
	useRouter().push(`/trips/type/completed/${data.id}/trip-details`)
	selectedTrip.value = data
}

const tableFields = ref([
	{
		text: 'S/N',
		value: 'idx',
		width: '10%'
	},
    {
        text: 'TRIP DATE',
        value: 'trip_date'
    },
    {
        text: 'ROUTE CODE ( START TIME)',
        value: 'route_code'
    },
    {
        text: 'ROUTE',
        value: 'route'
    },
    {
        text: 'PARTNER\'S NAME',
        value: 'partner'
    },
    {
        text: 'VEHICLE NAME - COST OF SUPPLY',
        value: 'vehicle'
    },
	{
        text: 'DRIVER',
        value: 'driver'
    },
	{
        text: 'PASSENGERS',
        value: 'passengers'
    },
	{
		text: 'ACTIONS',
		value: 'action'
	}
])

selectedTrips.value = []
</script>

<style scoped></style>
