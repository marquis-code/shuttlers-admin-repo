<template>
	<main>
		<ButtonGoBack url="/trips/routes" class="mb-6" />
		<section v-if="!$route?.query?.booking_date" class="xl:flex gap-x-6">
			<section class="xl:w-6/12 space-y-6">
				<ModulesRoutesDetailsInfoCard />
				<ModulesRoutesDetailsRouteDriversTable />
				<ModulesRoutesDetailsBookingInfoDetails />
			</section>
			<section class="xl:w-6/12 space-y-6">
				<ModulesRoutesDetailsPassengers />
				<ModulesRoutesDetailsBookingReport />
				<ModulesRoutesDetailsPaymentOptions />
				<ModulesRoutesDetailsCharges />
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
							Route Bookings -
							{{
								moment.utc($route?.query?.booking_date).format("Do MMMM, YYYY")
							}}
						</div>
						<div class="flex items-center gap-x-3">
							<button
								class="text-xs bg-white text-black border border-black px-3 py-2 rounded-md"
								@click="handlePassengersNotification"
							>
								Notify Users
							</button>
							<button class="text-xs text-white bg-black px-3 py-2 rounded-md" @click="onDownload">
								Downlod Report
							</button>
						</div>
					</div>
					<div class="bg-white py-4 px-3 w-full">
						<div
							class="grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:grid-cols-3 gap-x-3 w-full"
						>
							<div class="w-full">
								<select v-if="!loading"
									v-model="form.itinerary_id"
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
								<Skeleton v-else height="50px" />
							</div>
							<div class="w-full">
								<select
									v-if="!loadingRouteDrivers"
									v-model="form.driver_id"
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
								<Skeleton v-else height="50px" />
							</div>
							<div class="w-full xl:w-1/2">
								<button
									:disabled="!isFilterFormEmpty || loadingRoutePassengers"
									class="text-xs disabled:cursor-not-allowed disabled:opacity-25 text-white w-full bg-black px-3 py-3 rounded-md"
									@click="applyFilter"
								>
									{{ loadingRoutePassengers ? 'processing...' : 'Apply Filter' }}
								</button>
							</div>
						</div>
					</div>
				</template>
				<template #item="{ item }">
					<p v-if="item.user" class="">
						{{ item?.data?.user }}
						<span v-if="item?.data?.user?.bus_captain_id">
							<img src="@/assets/icons/source/bus-captain.svg" alt="">
							<span class="captain-text ml-1">Bus Captain</span>
						</span>
					</p>
					<p v-if="item.contact" class="">
						<a class="text-blue-600 text-medium underline" :href="`mailto:` + item.data.user_email" target="_blank">{{ item?.data?.user_email }}</a><br>
						<a class="text-blue-600 text-medium underline" :href="`tel:` + item.data.user_phone" target="_blank">{{ item?.data?.user_phone }}</a>
					</p>
					<p v-if="item.created_at">
						{{
							moment.utc(item?.data?.created_at).format("Do MMMM, YYYY, h:mm A")
						}}
					</p>
					<div
						v-if="item.dropoff_status"
						class="font-medium"
					>
						<div class="space-y-2">
							<p v-if="item?.data.check_in_status === 'picked-up' || item?.data.check_in_status === 'dropped-off'" class="text-[#006633] font-medium flex items-center gap-x-2 text-xs">
								<img src="@/assets/icons/source/green-tick.svg" alt="">
								Checked In
							</p>

							<p class="flex items-center gap-x-3 text-xs" :class="[item?.data.check_in_status === 'dropped-off' ? 'text-[#006633]' : 'text-[#ee9714]']">
								<img v-if="item?.data.check_in_status === 'dropped-off' || item?.data.check_in_status === 'dropped-off'" src="@/assets/icons/source/green-tick.svg" alt="">
								<img v-else src="@/assets/icons/source/yellow-tick.svg" alt="">
								{{ item?.data.check_in_status === 'dropped-off' ? 'Dropped Off' : 'Pending' }}
							</p>
						</div>
					</div>
					<div
						v-if="item.pickup_status"
						class="font-medium flex items-center gap-x-2 text-xs"
						:class="[
							item?.data?.pickup_status === 'dropped-off' || item?.data?.pickup_status === 'picked-up'
								? 'text-[#006633]'
								: 'text-[#ee9714]',
						]"
					>
						<img v-if="item?.data?.pickup_status === 'dropped-off' || item?.data?.pickup_status === 'picked-up'" src="@/assets/icons/source/green-tick.svg" alt="">
						<img v-else src="@/assets/icons/source/yellow-tick.svg" alt="">
						{{ item?.data?.pickup_status === 'dropped-off' || item?.data?.pickup_status === 'picked-up' ? 'Checked In' : 'Pending' }}
					</div>
					<div v-if="item.pickup">
						<RouteDescription
							:pickup="item.data.pickup.location"
							:destination="item.data.destination.location"
						/>
					</div>
					<!-- <div v-if="item.id" class="w-20">
						<ButtonIconDropdown
							:children="dropdownChildren"
							:data="item.data"
							class-name="w-56"
						/>
					</div> -->
				</template>
			</Table>
		</section>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useRoutePassengers } from '@/composables/modules/routes/booking-passengers'
import { useCreateUsers } from '@/composables/modules/users/create'
import { useNotifyPassenger } from '@/composables/modules/trips/passengers'
import { useTripsModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useGetRoutePassengersBookings } from '@/composables/modules/routes/getRoutesPassengersBookings'
import {
  useRouteDriversById,
  useItinerariesByRouteId
} from '@/composables/modules/routes/id'
import { useDownloadReport } from '@/composables/utils/csv'
const route = useRoute()
const emit = defineEmits(['download'])
const { loading: downloadingReport, download } = useDownloadReport()
const onDownload = () => {
	downloadingReport.value = true
	const csvData = computedPassengerData.value.map((itm) => ({
		Amount: itm.unit_cost,
		Pickup: itm.pickup.location,
		Destination: itm.destination.location,
		Email: itm.passenger_json.email,
		Name: itm.passenger_name,
		Phone: itm.passenger_json.phone,
		'Start Date': itm.created_at,
		'End Date': itm.created_at
	}))
	const title = `Bookings for booking on ${route?.query?.booking_date}`
	download(csvData, title)
	emit('download')
}
const {
  populateCreateBusCaptainForm,
  createBusCaptains,
  loading: processingBusCaptain
} = useCreateUsers()
const {
  routePassengersPayload,
  loadingRoutePassengers,
  getRoutePassengers,
  routePassengers,
  populateRoutePassengers
} = useRoutePassengers()
const { busstopUsersIds } = useNotifyPassenger()
const { loadingRouteDrivers, getRouteDriversById, routeDrivers } =
  useRouteDriversById()
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
const id = useRoute().params.id as string
getRouteDriversById(id)
getRouteItinerariesByRouteId(id)

const tableFields = [
  { text: 'USER', value: 'user' },
  { text: 'CONTACT', value: 'contact' },
  { text: 'ROUTE', value: 'pickup' },
  { text: 'BOOKED ON', value: 'created_at' },
  { text: 'PICK UP STATUS', value: 'pickup_status' },
  { text: 'DROP OFF STATUS', value: 'dropoff_status' }
//   {
//     text: 'ACTIONS',
//     value: 'id'
//   }
]

const form = reactive({
	driver_id: '',
	itinerary_id: ''
})

const isFilterFormEmpty = computed(() => {
	return !!(form.driver_id && form.itinerary_id)
})

const refreshPage = () => {
	const requestPayload = {
        routeId: id,
        corporateId: '',
        booking_days: [route?.query?.booking_date]
      }
      setBookingPassengersPayload(requestPayload)
      getRoutePassengersBookings()
}

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    const isNewQueryParamAdded =
      Object.keys(newQuery).length > Object.keys(oldQuery).length

    if (isNewQueryParamAdded) {
		refreshPage()
    }
  },
  { deep: true }
)

const computedPassengerData = computed(() => {
  return bookingResult.value[0]?.data.map((itm) => {
    return {
      ...itm,
      user: itm.user?.fname + ' ' + itm.user?.lname,
      contact: itm.user?.email + ' ' + itm.user?.phone,
	  user_email: itm.user?.email,
	  user_phone: itm.user?.phone,
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
    desc: `Are you sure you want to ${
      data.bus_captain_id
        ? 'Remove this user from been a bus captain?'
        : 'Make this user a bus captain?'
    }`,
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
  createBusCaptains().then(() => {
    refreshPage()
  })
}

const handlePassengersNotification = () => {
  computedPassengerData.value.map((itm) => busstopUsersIds.value.push(itm.id))
  useTripsModal().openNotifyPassengers()
}

const applyFilter = () => {
  const routePassengersPayload = {
    booking_days: [route?.query?.booking_date],
    driver_id: form.driver_id,
    itinerary_id: Number(form.itinerary_id)
  }
  populateRoutePassengers(routePassengersPayload)
  getRoutePassengers(id).then(() => {
	refreshPage()
  })
}
</script>
