<template>
	<main class="">
		<Table :loading="loadingActiveTrips" :headers="tableFields" :table-data="formattedActiveTripsList" :has-index="true" :has-options="true" :option="(data)=>$router.push(`/trips/type/active/${data.id}/trip-details`)">
			<template #header>
				<section class="flex flex-col gap-4 z-50">
					<TableTripFilter @filter="onFilterUpdate" />
					<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showDateRange:true }" @filter="onFilterUpdate" @download="downloadReport" />
				</section>
			</template>
			<template #item="{ item }">
				<p v-if="item.trip_date" class="min-w-[100px]">
					{{ item.data.trip_date }}
				</p>
				<div v-if="item.route_code" class="whitespace-nowrap min-w-[80px]" @click.stop>
					<NuxtLink :to="`/trips/routes/${item.data.route.id}/details`" class="text-blue-500">
						{{ item?.data?.route?.route_code }}
					</NuxtLink> <br>
					({{ moment.utc(item.data.trip_start_time).format('LT') }})
				</div>
				<div v-if="item.passengers" class="flex items-center gap-x-2 flex-col justify-center gap--y-2">
					<p>{{ item.data.passengers }}</p>
					<button class="bg-white text-shuttlersGreen border px-2 border-shuttlersGreen rounded-full" @click.stop="router.push(`/trips/type/active/${item.data.id}/passengers`)">
						View
					</button>
				</div>
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
				<p v-if="item.vehicle" class="min-w-[100px]">
					{{ item.data.vehicle }}
				</p>
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.pickup" :destination="item.data.destination" />
				</div>
				<div v-if="item.action" class="w-20">
					<!-- <button style="backgroundColor: #ff4500" class="text-white border px-2 py-1.5 rounded-lg" @click.stop="handleTripCancellation(item.data)">
						End Trip
					</button> -->
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingActiveTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch'
import { useTripOptions } from '@/composables/modules/trips/options'
import { useCreateIssues } from '@/composables/modules/trips/issues'
import { isProdEnv } from '@/composables/utils/system'

const { initLogIssues } = useCreateIssues()
const { initializeEndTrips } = useTripOptions()
const { getActiveTrips, loadingActiveTrips, activeTripsList, onFilterUpdate, moveTo, total, page, next, prev, downloadReport } = useGetActiveTripsList()
getActiveTrips()
const formattedActiveTripsList = computed(() =>
 activeTripsList.value.map((i:any, index) => {
         return {
             ...i,
             route_code: `${i?.route?.route_code}`,
			 pickup: i?.route?.pickup,
			 destination: i?.route?.destination,
			 partner: i?.vehicle?.partner?.company_name ?? 'N/A',
             vehicle: `${i?.vehicle?.brand} ${i?.vehicle?.name}  (${i?.vehicle?.registration_number})`,
			 passengers: `${i?.passengers_count}/${i?.vehicle.seats}`,
             action: '',
			 trip_date: moment(i.trip_start_time).format('LL'),
			 idx: index + 1
         }
    })
)

const handleTripCancellation = (data) => {
	initializeEndTrips(data)
}
const router = useRouter()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
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

const dropdownChildren = computed(() => {
	return [
		{ name: 'Log Issue', func: (data) => initLogIssues(data), hide: isProdEnv.value },
        { name: 'End Trip', func: (data) => handleTripCancellation(data), class: '!text-red' }
    ]
})
</script>

<style scoped></style>
