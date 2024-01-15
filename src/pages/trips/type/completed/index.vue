<template>
	<main class="">
		<Table :loading="loadingCompletedTrips" :headers="tableFields" :table-data="formattedCompletedTripsList" :has-options="true" :option="(data)=>useRouter().push(`/trips/type/completed/${data.id}/trip-details`)">
			<template #header>
				<section class="flex flex-col gap-4 z-50">
					<TableTripFilter @filter="onFilterUpdate" />
					<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showDateRange:true }" @filter="onFilterUpdate" @download="downloadReport" />
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
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.dropoff" />
				</div>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingCompletedTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetCompletedTripsList } from '@/composables/modules/trips/fetch'
import { useCreateIssues } from '@/composables/modules/trips/issues'
import { useTransferTrip } from '@/composables/modules/trips/transfer'
import { useUser } from '@/composables/auth/user'
import { isProdEnv } from '@/composables/utils/system'

const { user } = useUser()
const { initLogIssues } = useCreateIssues()
const { initTransfer } = useTransferTrip()
const { getCompletedTrips, loadingCompletedTrips, completedTripsList, onFilterUpdate, moveTo, total, page, next, prev, downloadReport } = useGetCompletedTripsList()
getCompletedTrips()
const router = useRouter()

const formattedCompletedTripsList = computed(() =>
completedTripsList.value.map((i:any, index) => {
         return {
             ...i,
             route_code: i?.route?.route_code ?? 'N/A',
			 created_at: useDateFormat(i.trip_start_time, 'MMMM d, YYYY').value ?? 'N/A',
			 trip_time: i?.route_itinerary?.trip_time ?? 'N/A',
			 pickup: i?.route?.pickup ?? 'N/A',
			 dropoff: i?.route?.destination ?? 'N/A',
			 partner: i?.vehicle?.partner?.company_name ?? 'N/A',
             vehicle: `${i?.vehicle?.brand} ${i?.vehicle?.name}  (${i?.vehicle?.registration_number})`,
			 passengers: `${i?.passengers_count}/${i?.vehicle.seats}`,
             action: '',
			 idx: index + 1
         }
    })
)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'View Financials', func: (data) => { useRouter().push(`/trips/type/completed/${data.id}/financials`) } },
	{ name: 'Log Issue', func: (data) => initLogIssues(data), hide: isProdEnv.value },
	{ name: 'Transfer trip', func: (data) => { initTransfer(data) }, hide: user.value?.role !== 'super_admin' }
])

const tableFields = ref([
	{
		text: 'S/N',
		value: 'idx',
		width: '10%'
	},
    {
        text: 'TRIP DATE',
        value: 'created_at'
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
        text: 'VEHICLE NAME',
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

</script>

<style scoped></style>
