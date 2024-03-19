<template>
	<main>
		<Skeleton v-if="processing" height="300px" />
		<div v-else class="rounded-md bg-white shadow-md">
			<p class="border-b text-gray-500 font-medium text-sm p-4">
				Passengers
			</p>
			<div class="p-3 space-y-6">
				<div class="">
					<CompanySelector v-model="corporate" label="Filter by company" class="" />
				</div>
				<div>
					<button class="bg-black text-white text-xs px-3 py-2 rounded-md">
						Apply Filter
					</button>
				</div>
				<div>
					<div v-if="currentWeekDates">
						<Table :option="onRowClicked" :loading="processing" :headers="newTableFields"
							:table-data="currentWeekDates" :has-index="true">
							<template #item="{ item }">
								<p v-if="item.route_day" class="">
									{{ moment(item.data.date).format("ddd") }}
								</p>
								<div v-if="item.date">
									{{ item.data.date }}
								</div>
								<div v-if="item.passengers">
									{{ item.data.passengers }}
								</div>
							</template>

							<template #footer>
								<nav class="isolate -space-x-px rounded-md shadow-sm flex justify-center items-center"
									aria-label="Pagination">
									<a v-for="weekNumber in weekNumbers" :key="weekNumber" href="#" aria-current="page"
										class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold border-r-2 border-white text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										@click.prevent="setCurrentWeek(weekNumber)">Week {{ weekNumber }}</a>
								</nav>
							</template>
						</Table>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDateGrouping } from '@/composables/core/useGroupDatesByWeek'
// import { useGroupDatesByWeek } from '@/composables/core/useGroupDatesByWeek'
import { useGetRoutePassengersBookings } from '@/composables/modules/routes/getRoutesPassengersBookings'
import { useDaysInMonth } from '@/composables/core/useMonthDays'
const router = useRouter()
const daysInMonth = useDaysInMonth()
const corporate = ref('') as any
const currentPage = ref(1)
const id = useRoute().params.id as string
const {
	processing,
	setBookingPassengersPayload,
	getRoutePassengersBookings,
	bookingResult,
	bookingDate,
	next, prev, moveTo, total, page, setSelectedVBookingData
} = useGetRoutePassengersBookings()
// const { weeks, getDatesForWeek, setDataPayload } = useGroupDatesByWeek()
const { setCurrentWeek, currentWeekDates, weekNumbers, setDataPayload } = useDateGrouping()
const tableFields = [
	{ text: 'Route day', value: 'route_day' },
	{ text: 'Total Passengers', value: 'passengers' },
	{ text: 'Date', value: 'date' }
]

const newTableFields = [
	{ text: 'Route day', value: 'route_day' },
	{ text: 'Date', value: 'date' },
	{ text: 'Total Passengers', value: 'passengers' }
]

watch(bookingResult, (val) => {
	if (val) {
		setDataPayload(val)
	}
})

// const selectedWeek = ref<number | null>(null)

// const weekNumbers = computed(() => Array.from(weeks.value.keys()).sort((a, b) => a - b))
// const selectedWeekDates = computed(() => selectedWeek.value ? getDatesForWeek(selectedWeek.value) : [])

const loadRoutePassengers = () => {
	const requestPayload = {
		routeId: useRoute().params.id,
		corporateId: corporate.value.id,
		booking_days: daysInMonth
	}
	setBookingPassengersPayload(requestPayload)
	getRoutePassengersBookings()
}
// const sortedBookingResult = computed(() => {
// 	return bookingResult.value.sort((a, b) => b.passengers - a.passengers)
// })

loadRoutePassengers()
watch(corporate,
	() => {
		loadRoutePassengers()
	}
)

const onRowClicked = (data) => {
	bookingDate.value = data.date
	setSelectedVBookingData(data.data)
	const query = { ...router.currentRoute.value.query, booking_date: data.date }
	router.push({ query })
}
</script>
