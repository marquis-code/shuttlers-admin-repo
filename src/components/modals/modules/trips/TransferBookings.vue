<template>
	<Modal :is-medium-modal="true" modal="$atts.modal" title="Transfer Booking" :no-close-btn="true">
		<form class="flex flex-col gap-4" @submit.prevent="transferBooking">
			<p v-if="route?.id">
				Transfer bookings to {{ route?.route_code }} ( {{ route?.pickup }} to {{ route?.destination }} ) {{ itinerary?.trip_time }}
			</p>
			<div v-show="step === 1" class="flex flex-col gap-4">
				<RouteSelector @selected="onRouteSelected" />
				<div v-if="route?.id" class="flex flex-col">
					<label class="label">Assign itinerary</label>
					<select v-model="itinerary" class="input-field">
						<option value="">
							Select Itinerary
						</option>
						<option v-for="n in route_itineraries" :key="n?.id" :value="n">
							{{ n.trip_time }}
						</option>
					</select>
				</div>
				<!-- <div v-if="itinerary?.id" class="flex flex-col">
					<label class="label">Select vehicle</label>
					<select v-model="vehicle" class="input-field">
						<option value="">
							Select vehicle
						</option>
						<option v-for="n in route_vehicles" :key="n?.id" :value="n">
							{{ getVehicleName(n) }}
						</option>
					</select>
				</div> -->
				<div class="flex gap-2 items-center">
					<input v-model="for_today" type="checkbox">
					<label class="text-sm text-dark m-0">Transfer booking for only today</label>
				</div>
				<div v-if="!for_today" class="grid grid-cols-2 gap-4">
					<div class="flex flex-col">
						<label class="label">Start date</label>
						<InputDateInput
							id="startDate"
							v-model="start_date"
							class="font-light"
							placeholder="Select start date"
							:disabled-date="()=>null"
							:clearable="true"
						/>
					</div>
					<div class="flex flex-col">
						<label class="label">End date</label>
						<InputDateInput
							id="endDate"
							v-model="end_date"
							class="font-light"
							placeholder="Select end date"
							:disabled-date="()=>null"
							:clearable="true"
						/>
					</div>
				</div>
			</div>
			<div v-if="step === 2">
				<Table :loading="false" :headers="tableFields" :table-data="computedTableData">
					<template #item="{ item }">
						<p v-if="item.passenger_name" class="">
							{{ item?.data?.passenger_name ?? 'N/A' }}
						</p>

						<p v-if="item.old_pickup" class="">
							{{ item?.data?.old_pickup ?? 'N/A' }}
						</p>
						<div v-if="item.new_pickup" class="w-full">
							<select v-model="item.data.new_pickup" class="input-field w-full">
								<option disabled value="">
									Select Pickup
								</option>
								<option v-for="itm in pickupLocations" :key="itm.id" :value="itm.id">
									{{ itm.name }}
								</option>
							</select>
						</div>
						<span v-if="item.old_dropoff" class="flex items-center gap-4">
							<span>{{ item?.data?.old_dropoff ?? 'N/A' }}</span>
						</span>
						<div v-if="item.new_dropoff" class="gap-4 w-full">
							<select v-model="item.data.new_dropoff" class="input-field w-full">
								<option disabled value="">
									Select Drop-off
								</option>
								<option v-for="itm in dropoffLocations" :key="itm.id" :value="itm.id">
									{{ itm.name }}
								</option>
							</select>
						</div>
					</template>
				</Table>
			</div>
			<div class="flex items-center gap-4 justify-end">
				<button v-if="step === 1" :disabled="!enableStepOneBtn" type="button" class="btn p-2 bg-dark text-light px-4 font-medium" @click="step = 2">
					Continue
				</button>
				<button v-else type="button" class="btn p-2 bg-dark text-light px-4 font-medium" @click="step = 1">
					Back
				</button>
				<button v-if="step === 2" :disabled="loading" class="btn p-2 bg-dark text-light px-4 font-medium" type="submit">
					{{ loading ? 'processing' : 'Transfer' }}
				</button>
			</div>
		</form>
	</Modal>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useTransferBookings } from '@/composables/modules/trips'

const { loading, route, itinerary, route_itineraries, route_vehicles, vehicle, for_today, start_date, end_date, pickupLocations, dropoffLocations, computedTableData, transferBooking, enableStepOneBtn, clearObj } = useTransferBookings()
const onRouteSelected = (val) => {
    route.value = val
}
const step = ref(1)
const tableFields = ref([
    { text: 'PASSENGER NAME', value: 'passenger_name' },
    { text: 'OLD PICKUP', value: 'old_pickup' },
    { text: 'NEW PICKUP', value: 'new_pickup' },
    { text: 'OLD DROPOFF', value: 'old_dropoff' },
    { text: 'NEW DROPOFF', value: 'new_dropoff' }

])

const getVehicleName = (data:Record<string, any>) => {
    return `${data?.vehicle?.brand} ${data?.vehicle?.name} ${data?.vehicle?.registration_number} - ${data?.vehicle?.seats} seater - ${data?.driver?.fname} ${data?.driver?.lname}`
}

onBeforeUnmount(() => clearObj())
</script>
