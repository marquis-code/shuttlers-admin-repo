<template>
	<Modal
		modal="$atts.modal"
		title="Book a trip"
		:no-close-btn="false"
		class="text-center w-[500px]"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="bookTrip">
			<div class="field relative w-full">
				<RouteSelector class="w-full" @selected="(val) => selectedRoute = val" />
			</div>
			<div
				v-if="selectedRoute?.id"
				class="flex justify-between items-center"
			>
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
					<select
						id="itinerary"
						v-model="itinerary_id"
						class="border-red-500 w-full text-sm border outline-none py-2.5 text-gray-900 rounded-md px-3"
					>
						<option value="" class="" disabled>
							--- select ---
						</option>
						<option
							v-for="(itinerary, idx) in itineraries"
							:key="idx"
							:value="itinerary.id"
						>
							{{ itinerary?.trip_time }}
						</option>
					</select>
				</div>
				<Skeleton v-else height="50px" />
			</div>
			<div class="field relative">
				<label for="route">Select Pickup Point</label>
				<select
					v-if="!loading_bus_stops"
					id="route"
					v-model="pickup"
					class="border-red-500 text-sm w-full border outline-none py-2.5 rounded-md px-3"
				>
					<option class="" disabled>
						--- select ---
					</option>
					<option
						v-for="(busStop, idx) in pickupBusstops"
						:key="idx"
						:value="busStop"
					>
						{{ busStop?.name }}
					</option>
				</select>
				<Skeleton v-else height="50px" />
			</div>
			<div class="field relative">
				<label for="route">Select Drop Off Point</label>
				<select
					v-if="!loading_bus_stops"
					id="route"
					v-model="destination"
					class="border-red-500 text-sm w-full border outline-none py-2.5 rounded-md px-3"
				>
					<option class="" disabled>
						--- select ---
					</option>
					<option
						v-for="(destination, idx) in dropoff_busstops"
						:key="idx"
						:value="destination"
					>
						{{ destination?.name }}
					</option>
				</select>
				<Skeleton v-else height="50px" />
			</div>
			<div class="z-[1000000]">
				<label for="startDate">Choose Date</label>
				<input v-model="start_date" type="date" class="input-field">
			</div>
			<div class="field relative">
				<label for="route">Select Payment Source</label>
				<select
					id="itinerary"
					v-model="payment_source"
					class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3"
				>
					<option value="" class="" disabled>
						--- select ---
					</option>
					<option
						v-for="(source, idx) in payment_source_types"
						:key="idx"
						:value="source.value"
					>
						{{ source?.name }}
					</option>
				</select>
			</div>
			<div class="">
				<div class="flex items-center gap-x-2">
					<label class="block text-sm" for="route">Is Subscription?</label
					><input
						id="route"
						v-model="has_subscription"
						class="block mb-1"
						type="checkbox"
					>
				</div>
				<div v-if="has_subscription" class="mb-4">
					<div class="space-y-4">
						<label class="text-sm">Select Pickup Days</label>
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
								<label :for="day" class="form-check-label block m-0">{{
									day.charAt(0).toUpperCase() + day.substring(1)
								}}</label>
							</div>
						</div>
						<div>
							<label class="text-sm">Select Trip Weeks</label>
							<div class="flex items-center gap-4">
								<div
									v-for="i in 4"
									:key="i"
									class="flex items-center gap-x-3"
								>
									<input
										:id="`item${i}`"
										v-model="num_of_weeks"
										class="block"
										type="radio"
										:value="i"
									>
									<label :for="`item${i}`" class="block mt-2">
										{{ i }} {{ i > 1 ? 'weeks' : 'week' }}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex items-center gap-x-3">
				<label for="route" class="block text-sm">With Luggage?</label>
				<input
					id="route"
					v-model="has_luggage"
					type="checkbox"
					class="block"
				>
			</div>
			<div
				v-if="has_luggage"
				class="flex justify-start items-start flex-col"
			>
				<div>
					<label for="route" class="block text-sm">Luggage Quantity</label>
				</div>
				<div class="w-full">
					<input
						v-model="luggage_quantity"
						type="number"
						class="py-2 border border-gray-500 w-full rounded-md px-3 outline-none"
					>
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

			<div
				v-if="total_fare"
				class="flex flex-col gap-4 border-t border-b py-4"
			>
				<div class="flex items-center justify-between">
					<h3 class="text-dark font-bold">
						Additional Charges
					</h3>
					<icon name="down" class="w-4" />
				</div>
				<div v-if="selectedRoute_charges.length" class="flex flex-col gap-2">
					<div
						v-for="charge in selectedRoute_charges"
						:key="charge.id"
						class="flex justify-between gap-4"
					>
						<div class="flex gap-2 items-center">
							<div class="flex gap-2">
								<p class="text-sm">
									{{ charge.name }}
								</p>
								<VTooltip>
									<a class="cursor-pointer">
										<img
											src="@/assets/icons/source/help.svg"
											class="w-4"
											alt=""
										>
									</a>

									<template #popper>
										{{ charge?.description }}
									</template>
								</VTooltip>
							</div>

							<ToggleButtonSmall
								v-if="!charge.is_compulsory"
								v-model="charge.selected"
								:name="charge.name"
								label=""
								class="m-0 p-0"
							/>
						</div>
						<span class="text-dark font-medium">
							{{ convertToCurrency(charge.total) }}</span
						>
					</div>
				</div>
			</div>

			<div
				v-if="total_fare"
				class="flex items-center justify-between gap-2 w-full"
			>
				<p class="text-sm">
					You pay:
				</p>
				<p class="font-bold text-green">
					{{ convertToCurrency(total_pay) }}
				</p>
			</div>

			<div class="flex justify-between items-center gap-x-10">
				<button
					type="submit"
					class="bg-gray-600 py-3 rounded-md text-xs text-white w-full"
					@click="useUserModal().closeBookTrip()"
				>
					Cancel
				</button>
				<button
					:disabled="loading || !enableButton"
					type="submit"
					class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25"
				>
					<span v-if="!loading" class="text-xs">
						Confirm and Book Ride
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useBookUserTrip } from '@/composables/modules/users/book_trip'
import { days_of_the_week } from '@/composables/utils/constant'
import { useUserModal } from '@/composables/core/modals'
import { convertToCurrency } from '@/composables/utils/formatter'

const { selectedRoute, itineraries, itinerary_id, loading, pickup, destination, has_subscription, payment_source, pickupBusstops, dropoff_busstops, start_date, days_ids, has_luggage, luggage_quantity, num_of_weeks, loading_iti, loading_bus_stops, total_fare, total_pay, selectedRoute_charges, bookTrip, clearBookUserTripObj, enableButton } = useBookUserTrip()

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

onBeforeUnmount(() => clearBookUserTripObj())
</script>
