<template>
	<main class="">
		<Table :loading="loadingCancelledTrips" :headers="tableFields" :table-data="cancelledTripsList" :has-options="true" :has-index="true" :option="(data)=>$router.push(`/trips/type/cancelled/${data.id}/trip-details`)" :page="page">
			<template #header>
				<section class="flex flex-col gap-4 z-50">
					<TableTripFilter @filter="onFilterUpdate" />
					<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showDateRange:true }" @filter="onFilterUpdate" @download="downloadReport" />
				</section>
			</template>
			<template #item="{ item }">
				<p v-if="item.trip_date" class="whitespace-nowrap">
					{{ item.data.trip_date }}
				</p>
				<p v-if="item.partner">
					{{ item.data.vehicle?.partner?.company_name ?? 'N/A' }}
				</p>
				<p v-if="item.reason" class="min-w-[100px]">
					{{ item.data.description || 'N/A' }}
				</p>
				<p v-if="item.vehicle">
					{{ `${item.data?.vehicle?.brand} ${item.data?.vehicle?.name}  (${item.data?.vehicle?.registration_number})` }}
				</p>
				<span v-if="item.driver" class="text-blue-500 flex gap-1 flex-wrap" @click.stop>
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
				<span v-if="item.route_code" @click.stop>
					<NuxtLink :to="`/trips/routes/${item.data.route.id}/details`" class="text-blue-500">{{ item?.data?.route?.route_code }}</NuxtLink> <span>({{ item?.data?.itinerary?.trip_time }})</span>
				</span>
				<div v-if="item.passengers" class="flex items-center gap-x-2 flex-col justify-center gap--y-2">
					<p>{{ item.data.passengers_count || 0 }}/{{ item.data.vehicle?.seats }}</p>
					<button class="bg-white text-shuttlersGreen border px-2 border-shuttlersGreen rounded-full" @click.stop="router.push(`/trips/type/cancelled/${item.data.id}/passengers`)">
						View
					</button>
				</div>
				<div v-if="item.route">
					<RouteDescription :pickup="item.data.route?.pickup" :destination="item.data?.route?.destination" />
				</div>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren(item.data)" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingCancelledTrips" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useGetCancelledTripsList } from '@/composables/modules/trips/fetch'
import { useTripOptions } from '@/composables/modules/trips/options'
import { dayIsInThePast } from '@/composables/utils/formatter'
import { useCreateIssues } from '@/composables/modules/trips/issues'
import { isProdEnv } from '@/composables/utils/system'

const { getCancelledTrips, loadingCancelledTrips, cancelledTripsList, onFilterUpdate, moveTo, total, page, next, prev, downloadReport } = useGetCancelledTripsList()
getCancelledTrips()

const { initializeStartTrips, initializeCancelTrips, initializeCompleteTrips, initializeTripUpdate } = useTripOptions()
const { initLogIssues } = useCreateIssues()
const router = useRouter()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = (main_data) => {
 const dropdownOptions = [
        { name: 'Start Trip', func: (data) => initializeStartTrips(data) },
        { name: 'Update Trip', func: (data) => initializeTripUpdate(data) },
		{ name: 'Log Issue', func: (data) => initLogIssues(data), hide: isProdEnv.value },
        { name: 'Cancel Trip', func: (data) => initializeCancelTrips(data), class: '!text-red' }
    ]
    if (dayIsInThePast(main_data.trip_date)) {
        dropdownOptions.push({ name: 'Complete Trip', func: (data) => initializeCompleteTrips(data) })
    }
    return dropdownOptions
}

const tableFields = ref([
    { text: 'TRIP DATE', value: 'trip_date' },
    { text: 'ROUTE CODE ( START TIME)', value: 'route_code' },
    { text: 'ROUTE', value: 'route' },
    { text: 'PARTNER\'S NAME', value: 'partner' },
    { text: 'VEHICLE NAME', value: 'vehicle' },
	{ text: 'DRIVER', value: 'driver' },
	{ text: 'REASON', value: 'reason' },
	{ text: 'PASSENGERS', value: 'passengers' }
])

</script>

<style scoped></style>
