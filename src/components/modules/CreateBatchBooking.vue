<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="bg-white rounded-md border w-full lg:w-6/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Batch book a trip
				</p>
			</div>
			<hr>
			<form class="space-y-6 p-6 mt-5" @submit.prevent="batchBookTrip">
				<div class="flex items-center gap-x-2">
					<label class="form-label">Upload Customer emails (csv only)</label>
					<button :disabled="downloading" class="font-medium text-xs text-white px-3 py-2 bg-black rounded-md" @click.prevent="downloadCsv">
						{{ downloading ? 'downloading..' : 'Download' }} csv template
					</button>
				</div>s
				<div>
					<ModulesUsersBatchBookingCsvFileUploadInput @emails="handleUploadedEmails" />
				</div>

				<div class="field relative w-full">
					<RouteSelector class="w-full" @selected="(val) => selectedRoute = val" />
				</div>
				<div v-if="selectedRoute?.id" class="flex justify-between items-center">
					<div class="flex flex-col items-start justify-start">
						<p class="text-xs">
							Pickup
						</p>
						<p class="text-xs">
							{{ `${selectedRoute?.pickup.slice(0, 20)}...` }}
						</p>
					</div>
					<div class="flex flex-col items-end justify-end">
						<p class="text-xs">
							Drop-Off
						</p>
						<p class="text-xs">
							{{ `${selectedRoute?.destination.slice(0, 20)}...` }}
						</p>
					</div>
				</div>

				<div class="field relative">
					<div v-if="!loading_iti" class="w-full">
						<label for="itinerary">Select Itinerary</label>
						<select id="itinerary" v-model="selectedItinerary"
							class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3">
							<option value="" class="" disabled>
								--- select ---
							</option>
							<option v-for="(itinerary, idx) in itineraries" :key="idx" :value="itinerary">
								{{ itinerary?.trip_time }}
							</option>
						</select>
					</div>
					<Skeleton v-else height="100px" />
				</div>
				<div class="field relative">
					<label for="pickup">Select Pickup Point</label>
					<select v-if="!loading_bus_stops" id="pickup" v-model="pickup"
						class="border-red-500 text-sm w-full border outline-none py-2.5 rounded-md px-3">
						<option class="" disabled>
							--- select ---
						</option>
						<option v-for="(busStop, idx) in pickupBusstops" :key="idx" :value="busStop">
							{{ busStop.name }}
						</option>
					</select>
					<Skeleton v-else height="100px" />
				</div>
				<div class="field relative">
					<label for="dropoff">Select Drop Off Point</label>
					<select v-if="!loading_bus_stops" id="dropoff" v-model="destination"
						class="border-red-500 text-sm w-full border outline-none py-2.5 rounded-md px-3">
						<option class="" disabled>
							--- select ---
						</option>
						<option v-for="(destination, idx) in dropoff_busstops" :key="idx" :value="destination">
							{{ destination.name }}
						</option>
					</select>
					<Skeleton v-else height="100px" />
				</div>
				<div v-if="!isProdEnv" class="flex flex-col gap-2">
					<div v-if="selectedItinerary?.id" class="flex items-center gap-3">
						<label for="return" class="m-0">Enable return</label>
						<input id="return" v-model="has_return" type="checkbox">
					</div>
					<template v-if="has_return">
						<Skeleton v-if="returnTripLoading" height="100px" />
						<div v-if="returnTripItinerary.id && !returnTripLoading" class="flex flex-col gap-2">
							<p class="text-sm font-bold">
								Return trip details
							</p>
							<div class="flex items-center justify-between">
								<p class="text-sm">
									Time:
								</p>
								<p class="text-dark font-medium text-sm">
									{{ returnTripItinerary?.trip_time }}
								</p>
							</div>
							<div class="flex items-center justify-between">
								<p class="text-sm">
									Route code:
								</p>
								<p class="text-dark font-medium text-sm">
									{{ returnTripItinerary?.route?.route_code || 'N/A' }}
								</p>
							</div>
						</div>
					</template>
				</div>
				<div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
					<div class="">
						<label for="startDate">Start Date</label>
						<InputDateInput id="startDate" v-model="start_date" class="font-light" placeholder="Filter by date" />
					</div>
					<div class="">
						<label for="startDate">End Date</label>
						<InputDateInput id="startDate" v-model="end_date" class="font-light" placeholder="Filter by date" :disabled-date="()=>null" />
					</div>
				</div>

				<div class="field relative">
					<label for="payment_source">Select Payment Source</label>
					<select id="payment_source" v-model="payment_source"
						class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3">
						<option value="" class="" disabled>
							--- select ---
						</option>
						<option v-for="(source, idx) in payment_source_types" :key="idx" :value="source.value">
							{{ source?.name }}
						</option>
					</select>
				</div>
				<div class="">
					<div class="flex items-center gap-x-2">
						<label class="block" for="is_sub">Is Subscription?</label><input id="is_sub" v-model="has_subscription" class="block mb-1" type="checkbox">
					</div>
					<div v-if="has_subscription" class="mb-4">
						<div class="space-y-4">
							<label>Select Pickup Days</label>
							<div class="grid grid-cols-3 gap-4">
								<div
									v-for="(day, index) in days_of_the_week"
									:key="index"
									class="form-check flex items-center gap-x-3"
								>
									<input
										:id="day"
										:checked="days_ids.includes(index+1)"
										class="form-check-input block"
										type="checkbox"
										@change="handleDaysSelection(index+1)"
									>
									<label :for="day" class="form-check-label block">{{
										day.charAt(0).toUpperCase() + day.substring(1)
									}}</label>
								</div>
							</div>
							<div>
								<label>Select Trip Weeks</label>
								<div class="flex items-center gap-4">
									<div
										v-for="item in 4"
										:key="item"
										class="flex items-center gap-x-3"
									>
										<input
											:id="`week_${item}`"
											v-model="num_of_weeks"
											class="block"
											type="radio"
											:value="item"
										>
										<label :for="`item${item}`" class="block mt-2">
											{{ item }} {{ item > 1 ? 'weeks' : 'week' }}
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex items-center gap-x-3">
					<label for="luggage" class="block">With Luggage?</label>
					<input id="luggage" v-model="has_luggage" type="checkbox" class="block">
				</div>
				<div v-if="has_luggage" class="flex justify-start items-start flex-col">
					<div><label for="route" class="block">Luggage Quantity</label></div>
					<div class="w-full">
						<input v-model="luggage_quantity" type="number" class="py-2 border border-gray-500 w-full rounded-md px-3 outline-none">
					</div>
				</div>
				<div v-if="destination?.id">
					<div class="flex items-center gap-x-1">
						<p>Fare:</p>
						<p class="ml-2 font-bold">
							{{ convertToCurrency(total_fare) }}
						</p>
					</div>
				</div>

				<div v-if="total_fare" class="flex flex-col">
					<h1 v-if="selectedRoute_charges.length" class="font-medium pt-4 mt-5 text-sm border-t border-grey10">
						Additional Charge
					</h1>
					<div v-if="selectedRoute_charges.length" class="flex flex-col">
						<div v-for="charge in selectedRoute_charges" :key="charge.id" class="list mt-2">
							<div class="flex gap-2 items-center">
								<div class="flex gap-2">
									<span class="text-grey5 text-sm"> {{ charge.name }}  </span>
									<VTooltip>
										<a class="cursor-pointer">
											<!-- <Icon name="help" class="w-4" /> -->
											<img src="@/assets/icons/source/help.svg" class="w-4" alt="">
										</a>

										<template #popper>
											{{ charge.description }}
										</template>
									</VTooltip>
								</div>

								<ToggleButtonSmall v-if="!charge.is_compulsory" v-model="charge.selected" :name="charge.name" label="" class="m-0 p-0" />
							</div>

							<span class="text-dark font-medium"> {{ convertToCurrency(charge.total) }}</span>
						</div>
					</div>
				</div>

				<div v-if="total_fare" class="flex items-center justify-between gap-2 w-full">
					<p class="text-sm font-medium">
						Pay per user:
					</p>
					<p class="font-bold text-green">
						{{ convertToCurrency(total_pay) }}
					</p>
				</div>

				<div>
					<button :disabled="!enableButton||loading" type="submit"
						class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25">
						<span v-if="!loading" class="text-xs">Confirm and Book Ride</span>
						<Spinner v-else />
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { isProdEnv } from '@/composables/utils/system'
import { convertToCurrency } from '@/composables/utils/formatter'
import useCsvDownload from '@/composables/core/useCsvDownload'
import { useBatchBookTrip } from '@/composables/modules/batchBooking/create'
import { days_of_the_week } from '@/composables/utils/constant'

const { downloadCsv, downloading } = useCsvDownload()
const { selectedRoute, itineraries, selectedItinerary, loading, pickup, destination, has_subscription, payment_source, pickupBusstops, dropoff_busstops, start_date, end_date, days_ids, has_luggage, luggage_quantity, num_of_weeks, loading_iti, loading_bus_stops, total_fare, total_pay, selectedRoute_charges, batchBookTrip, clearBatchBookTripObj, enableButton, has_return, emails, returnTripItinerary, returnTripLoading } = useBatchBookTrip()

const payment_source_types = reactive([
	{ value: 'main_balance', name: 'Main Balance' },
	{ value: 'credit_balance', name: 'Company Balance' },
	{ value: 'instant_payment', name: 'Charge my company' }
])

const handleDaysSelection = (index:number) => {
	if (!days_ids.value.includes(index)) {
		days_ids.value.push(index)
	} else {
	const pos = days_ids.value.indexOf(index)
		if (pos !== -1) {
			days_ids.value.splice(pos, 1)
		}
	}
}

const handleUploadedEmails = (val:string[]) => {
	emails.value = val.filter((el) => el !== '')
}

onBeforeUnmount(() => clearBatchBookTripObj())
</script>

<style scoped>
.list{
    @apply flex justify-between items-center
}
</style>
