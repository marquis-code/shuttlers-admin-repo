<template>
	<Skeleton v-if="loadingRouteBookings" height="300px" />
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
				<Table
					:loading="processing"
					:headers="tableFields"
					:table-data="bookingResult"
					:has-index="true"
				>
					<template #item="{ item }">
						<p v-if="item.route_day" class="">
							{{ moment(item.data.date).format("ddd") }}
						</p>
					</template>
				</Table>
				<MiniPaginator :current-page="1" :total-pages="bookingResult.length" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useGetRoutePassengersBookings } from '@/composables/modules/routes/getRoutesPassengersBookings'
import { useDaysInMonth } from '@/composables/core/useMonthDays'
const daysInMonth = useDaysInMonth()
const corporate = ref('') as any
const currentPage = ref(1)
const id = useRoute().params.id as string
const {
  processing,
  setBookingPassengersPayload,
  getRoutePassengersBookings,
  bookingResult
} = useGetRoutePassengersBookings()
const tableFields = [
  { text: 'Route day', value: 'route_day' },
  { text: 'Total Passengers', value: 'passengers' },
  { text: 'Date', value: 'date' }
]

const loadRoutePassengers = () => {
  const requestPayload = {
    routeId: useRoute().params.id,
    corporateId: corporate.value.id,
    booking_days: daysInMonth
  }
  setBookingPassengersPayload(requestPayload)
  getRoutePassengersBookings()
}

loadRoutePassengers()
watch(corporate,
  () => {
    loadRoutePassengers()
  }
)
</script>
