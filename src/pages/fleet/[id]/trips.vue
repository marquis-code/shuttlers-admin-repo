<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loadingTripHistory" :headers="tableFields" :table-data="fleeTripHistory" :has-index="true" :page="page" :has-options="true" :option="(data)=>$router.push(`/trips/type/completed/${data?.id}/trip-details`)">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<p v-if="item.trip_date" class="whitespace-nowrap">
					{{ moment(item.data.start_trip).format('ll') }}
				</p>
				<div v-if="item.route_code" class="flex flex-col">
					<p>{{ item.data.route?.route_code }}</p>
					<p>{{ moment(item.data.start_trip).format('LT') }}</p>
				</div>
				<div v-if="item.route">
					<RouteDescription :pickup="item.data?.route?.pickup" :destination="item.data?.route?.destination" />
				</div>
				<div v-if="item.driver" class="flex flex-col text-purp7">
					<NuxtLink :to="`/drivers/${item.data?.driver?.id}/driver-info`" @click.stop>
						{{ item.data?.driver?.fname }} {{ item.data?.driver?.lname }}
					</NuxtLink>
					<p @click.stop>
						{{ item.data?.driver?.phone }}
					</p>
				</div>
				<div v-if="item.rating" class="flex items-center gap-0">
					<Icon name="star" class="w-5 text-dark" />
					<p class="text-sm">
						0
					</p>
				</div>
				<ButtonIconDropdown v-if="item.action" :data="item.data" :children="dropdownChildren" />
				<div v-if="item.passengers" class="flex items-center gap-2">
					<p class="whitespace-nowrap">
						{{ item.data?.checkins?.length }} / 0
					</p>
					<button class="bg-white text-shuttlersGreen border px-2 border-shuttlersGreen rounded-full" @click.stop="$router.push(`/trips/type/completed/${item?.data?.id}/passengers`)">
						View
					</button>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingTripHistory" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useGetFleetTripHistory } from '@/composables/modules/fleets/id'

const { getFleetsTripHistory, loadingTripHistory, fleeTripHistory, moveTo, page, total, next, prev, onFilterUpdate } = useGetFleetTripHistory()
getFleetsTripHistory()

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
        text: 'ROUTE CODE (START TIME)',
        value: 'route_code'
    },
    {
        text: 'ROUTE',
        value: 'route'
    },
    {
        text: 'PARTNERS NAME',
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
        text: 'AVERAGE RATING',
        value: 'rating'
    },
    {
        text: 'ACTION',
        value: 'action'
    },
    {
        text: 'PASSENGERS',
        value: 'passengers'
    }
])

const dropdownChildren = computed(() => {
	return [
		{ name: 'View Financials', func: (data) => { useRouter().push(`/trips/type/completed/${data?.id}/financials`) } }
    ]
})

</script>

<style scoped></style>
