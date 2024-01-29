<template>
	<main>
		<section v-if="!$route?.query?.booking_date" class="flex gap-x-6">
			<section class="md:w-6/12 space-y-6">
				<ModulesRoutesDetailsInfoCard />
				<ModulesRoutesDetailsRouteDriversTable />
				<ModulesRoutesDetailsBookingInfoDetails />
			</section>
			<section class="md:w-6/12 space-y-6">
				<ModulesRoutesDetailsPassengers />
				<ModulesRoutesDetailsBookingReport />
				<ModulesRoutesDetailsPaymentOptions />
			</section>
		</section>
		<section v-else>
			<Table
				:loading="processing"
				:headers="tableFields"
				:table-data="computedPassengerData"
				:has-index="true"
			>
				<template #header>
					<div
						class="flex justify-between items-center bg-white rounded-t-md py-4 px-3"
					>
						<div class="font-semibold">
							Route Bookings - {{ $route?.query?.booking_date }}
						</div>
						<div class="flex items-center gap-x-3">
							<button class="text-xs bg-white text-black border border-black px-3 py-2 rounded-md"
								@click="handlePassengersNotification"
							>
								Notify Users
							</button>
							<button class="text-xs text-white bg-black px-3 py-2 rounded-md">
								Downlod Report
							</button>
						</div>
					</div>
					<div class="bg-white py-4 px-3 w-full">
						<div class="grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:grid-cols-3 gap-x-3 lg:w-6/12">
							<div class="w-full">
								<select
									v-if="!loading"
									class="bg-gray-100 outline-none rounded-md border border-gray-200 text-sm pl-4 w-full py-2.5"
								>
									<option value="" disabled default>
										select an itinerary
									</option>
									<option
										v-for="itm in routeItineraries"
										:key="itm.id"
										:value="itm.id"
									>
										{{ itm?.trip_time }}
									</option>
								</select>
								<Skeleton v-else height="100px" />
							</div>
							<div class="w-full">
								<select
									v-if="!loadingRouteDrivers"
									class="bg-gray-100 outline-none rounded-md text-sm border border-gray-200 w-full pl-4 py-2.5"
								>
									<option value="" disabled default>
										select a driver
									</option>
									<option
										v-for="itm in routeDrivers"
										:key="itm.id"
										:value="itm.id"
									>
										{{ itm.fname }} {{ itm.lname }}
									</option>
								</select>
								<Skeleton v-else height="100px" />
							</div>
							<div class="w-full lg:w-1/2">
								<button
									class="text-xs text-white w-full bg-black px-3 py-3 rounded-md"
								>
									Apply Filter
								</button>
							</div>
						</div>
					</div>
				</template>
				<template #item="{ item }">
					<p v-if="item.user" class="">
						{{ item?.data?.user }}
					</p>
					<p v-if="item.contact" class="">
						{{ item?.data?.contact }}
					</p>
					<p v-if="item.created_at">
						{{ moment.utc(item?.data?.created_at).format('Do MMMM, YYYY, h:mm A') }}
					</p>
					<p v-if="item.dropoff_status" class="font-medium" :class="[item?.data?.dropoff_status === 'pending' ? 'text-yellow-700' : 'text-shuttlersGreen' ]">
						{{ item?.data?.dropoff_status }}
					</p>
					<p v-if="item.pickup_status" class="font-medium" :class="[item?.data?.dropoff_status === 'pending' ? 'text-yellow-700' : 'text-shuttlersGreen' ]">
						{{ item?.data?.pickup_status }}
					</p>
					<div v-if="item.pickup">
						<RouteDescription :pickup="item.data.pickup.location" :destination="item.data.destination.location" />
					</div>
					<div v-if="item.id" class="w-20">
						<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
					</div>
				</template>
			</Table>
		</section>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useCreateUsers } from '@/composables/modules/users/create'
import { useNotifyPassenger } from '@/composables/modules/trips/passengers'
import { useTripsModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useGetRoutePassengersBookings } from '@/composables/modules/routes/getRoutesPassengersBookings'
import {
  useRouteDriversById,
  useItinerariesByRouteId
} from '@/composables/modules/routes/id'
const { populateCreateBusCaptainForm, createBusCaptains, loading: processingBusCaptain } = useCreateUsers()
const { busstopUsersIds } = useNotifyPassenger()
const {
  loadingRouteDrivers,
  getRouteDriversById,
  routeDrivers
} = useRouteDriversById()
const { routeItineraries, loading, getRouteItinerariesByRouteId } =
  useItinerariesByRouteId()
const {
  processing,
  setBookingPassengersPayload,
  getRoutePassengersBookings,
  bookingResult
} = useGetRoutePassengersBookings()
definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})
const route = useRoute()
const id = useRoute().params.id as string
getRouteDriversById(id)
getRouteItinerariesByRouteId(id)

const tableFields = [
  { text: 'USER', value: 'user' },
  { text: 'CONTACT', value: 'contact' },
  { text: 'ROUTE', value: 'pickup' },
  { text: 'BOOKED ON', value: 'created_at' },
  { text: 'PICK UP STATUS', value: 'pickup_status' },
  { text: 'DROP OFF STATUS', value: 'dropoff_status' },
  {
		text: 'ACTIONS',
		value: 'id'
	}
]
// const routeBookingDate = ref(route?.query)
onMounted(() => {
  const requestPayload = {
    routeId: id,
    corporateId: '',
    booking_days: [route?.query?.booking_date]
  }
  if (route?.query?.booking_date) {
	setBookingPassengersPayload(requestPayload)
    getRoutePassengersBookings()
  }
})

const computedPassengerData = computed(() => {
  return bookingResult.value[0]?.data.map((itm) => {
    return {
      ...itm,
      user: itm.user?.fname + ' ' + itm.user?.lname,
      contact: itm.user?.email + ' ' + itm.user?.phone,
	  pickup_status: itm?.check_in_status,
	  dropoff_status: itm?.check_in_status
    }
  })
})

const dropdownChildren = computed(() => {
	return [
		{ name: 'Make bus captain', func: (data) => handleRouteBusCaptain(data) }
    ]
})

const handleRouteBusCaptain = (data: any) => {
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: `Are you sure you want to ${data.bus_captain_id ? 'Remove this user from been a bus captain?' : 'Make this user a bus captain?'}`,
		loading: processingBusCaptain,
		call_function: () => handleBusCaptain(data)
    })
}

const handleBusCaptain = (data) => {
	const createBusCaptainForm = {
	user_id: data?.user_id,
    route_itinerary_id: data?.route_itinerary_id,
    route_vehicle_id: data?.vehicle_id
}
	populateCreateBusCaptainForm(createBusCaptainForm)
	createBusCaptains()
}

const handlePassengersNotification = () => {
	computedPassengerData.value.map((itm) => busstopUsersIds.value.push(itm.id))
	useTripsModal().openNotifyPassengers()
}
</script>
