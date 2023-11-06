<template>
	<main class="flex gap-x-6">
		<section class="md:w-6/12 space-y-6">
			<div v-if="!isEmptyObject(selectedRoute) || !loading" class="card">
				<div v-for="(itm, index) in routeDetails" :key="index"
					class="flex  gap-x-6 items-center py-4 border-b last:border-none">
					<div class="text-xs w-1/4">
						{{ itm.name }}
					</div>
					<div class="text-xs w-3/4 flex items-center">
						<button velse :class="itm.class" class="font-medium" @click="itm.func">
							{{ itm.value }}
						</button>
						<button v-if="itm.copyAction" @click="copyUrl()">
							<img src="@/assets/icons/source/copy.svg" alt="">
						</button>
					</div>
				</div>
			</div>
			<Skeleton v-else height="300px" />

			<div>
				<Table :loading="loading" :headers="tableFields" :table-data="computedRouteDrivers " :has-options="true">
					<template #header>
						<h1 class="border bg-white py-3 text-sm pl-4">
							Drivers on this route
						</h1>
					</template>
					<template #item="{ item }">
						<div v-if="item.driver" class="space-y-1 text-blue-600 py-2">
							<NuxtLink :to="`/drivers/${item?.data?.id}/driver-info`" class="block text-xs">
								{{ item.data.driver }}
							</NuxtLink>
						</div>
						<div v-if="item.type" class="space-y-1 text-blue-600 py-2">
							<NuxtLink :to="`/fleet/${item?.data?.vehicle?.id}/vehicle-info`" class="block text-xs">
								{{ item.data.type }}
							</NuxtLink>
						</div>
						<div v-if="item.itinerary" class="space-y-1 py-2">
							<span class="block text-xs">{{ item.data.itinerary }}</span>
						</div>
					</template>
				</Table>
			</div>

			<div class="card">
				<div v-for="(itm, index) in bookingInformationDetails" :key="index"
					class="flex justify-between items-center py-4 border-b last:border-none">
					<div class="text-sm">
						{{ itm.name }}
					</div>
					<div class="text-sm">
						{{ itm.value }}
					</div>
				</div>
			</div>
		</section>
		<section class="md:w-6/12 space-y-6">
			<div class="rounded-md bg-white shadow-md">
				<p class="border-b text-gray-500 font-medium text-sm p-4">
					Passengers
				</p>
				<div class="p-3 space-y-6">
					<div class="">
						<label for="">Filter By Company</label>
						<InputMultiSelectUsers v-model="selectedCorporate" />
					</div>
					<div>
						<button class="bg-black text-white text-xs px-3 py-2 rounded-md">
							Apply Filter
						</button>
					</div>
					<div>
						<Table :loading="loading" :headers="tableFields" :table-data="tableData" :has-options="true">
							<template #header>
								<h1 class="border bg-white py-3 text-sm pl-4">
									Drivers on this route
								</h1>
							</template>
							<template #item="{ item }">
								<div v-if="item.fname" class="space-y-1 text-blue-600 py-2">
									<span class="block">{{ item.data.fname }} {{ item.data.lname }}</span>
									<span class="block">{{ item.data.email }}</span>
									<span class="block">{{ item.data.phone }}</span>
								</div>
							</template>
						</Table>
					</div>
				</div>
			</div>

			<div class="rounded-md bg-white shadow-md">
				<div class="flex justify-between items-center border-b py-3 px-4">
					<div>
						<p class="text-sm">
							Reports
						</p>
					</div>
					<div class="relative">
						<div class="">
							<button class="">
								<span class="sr-only">Menu</span>
								<img src="@/assets/icons/source/download.svg" alt="download icon">
							</button>
							<a href="#"
								class="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
								Download
							</a>

							<button class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
								<span class="sr-only">Menu</span>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
									fill="currentColor">
									<path fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd" />
								</svg>
							</button>
						</div>

						<div class="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
							role="menu">
							<div class="p-2">
								<button v-for="(itm, idx) in downloadOptions" :key="idx" href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
									role="menuitem" @click="itm.func">
									{{ itm.name }}
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="p-4 space-y-6">
					<p class="font-medium text-sm">
						Business Booking Report
					</p>
					<div class="">
						<label for="" class="text-xs">Company</label>
						<InputMultiSelectUsers v-model="selectedCorporate" />
					</div>
					<div>
						<label for="month" class="text-xs">Month</label>
						<select id="month" v-model="selectedMonth" class="input-field" required>
							<option value="" class="text-sm">
								Select Month
							</option>
							<option v-for="item in monthsArray" :key="item.value" :value="item.value">
								{{ item.name }}
							</option>
						</select>
					</div>
					<button class="bg-black text-white px-3 py-2 text-xs rounded-md">
						Generate
					</button>
				</div>
			</div>

			<div class="rounded-md bg-white shadow-md">
				<section class="card p-4">
					<header class="flex justify-between w-full">
						<p>Payment Options</p>
						<button v-if="!isEditingPaymentOptionsLoading" type="button" class="bg-black text-xs text-white px-4 py-1 rounded-md" @click="isEditingPaymentOptions ? savePaymentOptions() : isEditingPaymentOptions = true">
							{{ isEditingPaymentOptions ? 'Save' : 'Edit' }}
						</button>
						<div v-else class="spinner-border mr-[20px] !w-3 !h-3" />
					</header>
					<div class="flex mt-3 gap-5 flex-wrap">
						<label v-for="option in paymentOptionsList" :key="option.id" :for="option.id" class="flex items-center text-sm font-light mt-1.5">
							<input v-model="selectedPaymentOptions" type="checkbox" :disabled="!isEditingPaymentOptions || isEditingPaymentOptionsLoading" :value="option.id">
							{{ option.title }}
						</label>
					</div>
				</section>
			</div>
		</section>
	</main>
</template>
<script setup lang="ts">
import { useAlert } from '@/composables/core/notification'
import { isEmptyObject } from '@/composables/utils/basics'
import { useRoutePaymentOptions } from '@/composables/modules/routes/fetch'
import { useRouteIdDetails, useRoutePaymentOptionsById, useTripStartTimeById, useRoutePassengersById, useRouteDriversById, useRouteBookingsById } from '@/composables/modules/routes/id'
const { selectedRoute, loading, getRouteById } = useRouteIdDetails()
const { routePaymentOptionsList, loadingSelectedRoutePaymentOptions, getRoutePaymentOptionsById } = useRoutePaymentOptionsById()
const { loadingRouteItineraries, getTripStartTimeById, itineraries } = useTripStartTimeById()
const { loadingRoutePassengers, getRoutePassengerseById, routePassengers } = useRoutePassengersById()
const { loadingRouteDrivers, getRouteDriversById, routeDrivers } = useRouteDriversById()
const { loadingRouteBookings, getRouteBookingsById, routeBookings, payload, corporateId } = useRouteBookingsById()
const { getPaymentOptions, loadingPaymentOptions, paymentOptionsList } = useRoutePaymentOptions()
const id = useRoute().params.id as string
getRouteById(id)
getTripStartTimeById(id)
getRouteDriversById(id)
getRoutePassengerseById(id)
getRouteBookingsById(id)
getRoutePaymentOptionsById()
getPaymentOptions()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const monthsArray = ref([
	{ name: 'Jan', value: 1 },
	{ name: 'Feb', value: 2 },
	{ name: 'Mar', value: 3 },
	{ name: 'Apr', value: 4 },
	{ name: 'May', value: 5 },
	{ name: 'Jun', value: 6 },
	{ name: 'Jul', value: 7 },
	{ name: 'Aug', value: 8 },
	{ name: 'Sep', value: 9 },
	{ name: 'Oct', value: 10 },
	{ name: 'Nov', value: 11 },
	{ name: 'Dec', value: 12 }
])
const isEditingPaymentOptions = ref(false)
const isEditingPaymentOptionsLoading = ref(false)
const selectedPaymentOptions = ref([])
// const paymentOptionsList = ref([])
selectedPaymentOptions.value = routePaymentOptionsList.value.map((item) => item.payment_options_id)
const savePaymentOptions = () => {

}

const selectedMonth = ref('')

const routeDetails = computed(() => {
	return [
		{ name: 'Status', value: selectedRoute.value.status === 1 ? 'Active' : 'Inactive', class: `text-white px-2 py-1 rounded-md ${selectedRoute.value.status === 1 ? 'bg-shuttlersGreen' : 'bg-rose-500'}`, func: () => { } },
		{ name: 'Route Code', value: selectedRoute.value.route_code, class: 'text-gray-600', func: () => { } },
		{ name: 'Route Description', value: selectedRoute?.value?.info?.description || 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'Route landing page url', value: routeUrl.value, class: 'text-shuttlersGreen', func: (val: string) => { handleClick(val) }, copyAction: true },
		{ name: 'Starting Point', value: selectedRoute?.value?.pickup, class: 'text-gray-600', func: () => { } },
		{ name: 'Ending Point', value: selectedRoute?.value?.destination, class: 'text-gray-600', func: () => { } },
		{ name: 'Capacity', value: selectedRoute?.value?.total_seats, class: 'text-gray-600', func: () => { } },
		{ name: 'Days Available', value: selectedRoute?.value?.availableDays || 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'Availability Start Date', value: routeStartDate.value, class: 'text-gray-600', func: () => { } },
		{ name: 'Availability End Date', value: routeEndDate.value, class: 'text-gray-600', func: () => { } },
		{ name: 'Unavailable Dates', value: routeUnavailableDays.value, class: 'text-orange-600', func: () => { } },
		{ name: 'Distance', value: selectedRoute?.value?.distance, class: 'text-gray-600', func: () => { } },
		{ name: 'Trip start time', value: computedTripStartTime.value, class: 'text-gray-600', func: () => { } },
		{ name: 'Duration', value: selectedRoute?.value?.duration, class: 'text-gray-600', func: () => { } },
		{ name: 'Availability', value: selectedRoute?.value?.visibility, class: `text-white px-2 py-1 rounded-md ${selectedRoute?.value?.visibility === 'public' ? 'bg-shuttlersGreen' : 'bg-black'}`, func: () => { } },
		{ name: 'Business user', value: selectedRoute?.value?.corporate ? selectedRoute?.value?.corporate?.corporate_name : 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'City', value: selectedRoute?.value?.city ? selectedRoute?.value?.city?.name : '-' }
	]
})

const bookingInformationDetails = computed(() => {
	return [
		{ name: 'Who pays for booking?', value: selectedRoute?.value?.payer || 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'When is payment happening?', value: selectedRoute?.value?.payment_mode || 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'Who owns this route?', value: selectedRoute?.value.owner_type || 'Not Available', class: 'text-gray-600', func: () => { } }
	]
})

const routeStartDate = computed(() => {
	return selectedRoute?.value?.route_availability_start_date ? new Date(selectedRoute?.value?.route_availability_start_date).toDateString() : 'Not Available'
})

const routeEndDate = computed(() => {
	return selectedRoute?.value?.route_availability_end_date ? new Date(selectedRoute?.value?.route_availability_end_date).toDateString() : 'Not Available'
})

const routeUnavailableDays = computed(() => {
	const days = selectedRoute?.value?.blacklisted_availability_days
	return days ? Array.from(JSON.parse(days) || []).join(', ') : 'Not Available'
})

const routeUrl = computed(() => {
	if (selectedRoute?.value?.slug) {
		return `${process.env.VUE_APP_URL}/routes/${selectedRoute?.value.slug}`
	} else {
		return ''
	}
})

const computedTripStartTime = computed(() => {
	const route = selectedRoute?.value
	const itineraries = route?.driver?.itineraries?.length
		? route.driver?.itineraries
		: null
	let tripStartTimeHrs = Infinity
	let tripStartTimeStr = '-'

	if (itineraries) {
		for (const itinerary of itineraries) {
			if (itinerary.trip_time_in_hours < tripStartTimeHrs) {
				tripStartTimeHrs = itinerary?.trip_time_in_hours
				tripStartTimeStr = itinerary?.trip_time
			}
		}
	}
	return tripStartTimeStr
})

const tableFields = ref([
	{
		text: 'DRIVER',
		value: 'driver'
	},
	{
		text: 'TYPE',
		value: 'type'
	},
	{
		text: 'ITINERARY',
		value: 'itinerary'
	}
])

const computedRouteDrivers = computed(() => {
	if (!routeDrivers.value.length) return []
    return routeDrivers.value.map((i) => {
         return {
             ...i,
             driver: `${i?.fname} ${i?.lname} - ${i?.email}`,
			 type: `${i?.vehicle?.type} . ${i?.vehicle?.seats} seater`,
			 itinerary: i?.itinerary?.trip_time
         }
    })
})

const selectedCorporate = ref(1)
const tableData = ref([])

const handleClick = (val: any) => {
	window.open(val.target.innerHTML, '_blank')
}

const downloadOptions = computed(() => {
	return [
		{ name: 'This Week', func: () => { } },
		{ name: 'This Month', func: () => { } },
		{ name: 'Custom', func: () => { } }
	]
})

const paymentOptions = ref([
	{
		name: 'Pay with Card',
		val: 'card'
	},
	{
		name: 'Pay with Pocket',
		val: 'pocket'
	},
	{
		name: 'Charge my Company',
		val: 'company'
	},
	{
		name: 'Pay with Bank',
		val: 'bank'
	},
	{
		name: 'Pay with Transfe',
		val: 'transfer'
	},
	{
		name: 'Pay with Credit line',
		val: 'credit_line'
	},
	{
		name: 'Pay with Wallet',
		val: 'wallet'
	},
	{
		name: 'Pay Offline',
		val: 'offline'
	}
])

const copyUrl = async () => {
	try {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(routeUrl.value)
		} else {
			const el = document.createElement('input')
			el.value = routeUrl.value
			el.style.opacity = String(0)
			document.body.appendChild(el)
			el.select()
			document.execCommand('copy')
			document.body.removeChild(el)
		}
		useAlert().openAlert({ type: 'Alert', msg: 'Copied to clipboard!' })
	} catch (e) {
		(e)
	}
}
</script>

<style scoped></style>
