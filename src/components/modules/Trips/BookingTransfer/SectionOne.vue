<template>
	<main class="space-y-6">
		<div>
			<div><RouteSelector class="" @selected="routeSelected" /></div>
			<p class="text-sm text-gray-500 mt-1">
				Please select a route
			</p>
		</div>
		<div class="field relative">
			<div v-if="!loadingItineraries" class="w-full">
				<label for="itinerary" class="text-sm">Assign Itinerary</label>
				<select id="itinerary" v-model="form.selectedItinerary"
					class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3 input-field">
					<option value="" class="" disabled>
						--- select ---
					</option>
					<option v-for="(itinerary, idx) in routeItineraries" :key="idx" :value="itinerary">
						{{ itinerary?.trip_time }}
					</option>
				</select>
			</div>
			<Skeleton v-else height="50px" />
		</div>
		<div class="field relative">
			<div v-if="!loadingVehicles" class="w-full">
				<label for="itinerary" class="text-sm">Selected Vehicle</label>
				<select id="itinerary" v-model="form.selectedVehicle"
					class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3 input-field">
					<option value="" class="" disabled>
						--- select ---
					</option>
					<option v-for="(item, idx) in itinerariesVehicles" :key="idx" :value="item">
						<p class="mb-0">
							{{ item?.vehicle?.brand }} •
							{{ item?.vehicle?.name }} {{ item?.vehicle?.registration_number }} •
							{{ item?.vehicle?.seats }} Seater
						</p>
						<p class="mb-0 pl-3">
							Driver: {{ item?.driver?.fname }} {{ item?.driver?.lname }}
						</p>
					</option>
				</select>
			</div>
			<Skeleton v-else height="50px" />
		</div>
		<div class="flex items-center gap-x-2">
			<input id="enableTransgerBookingForTodayOnly" v-model="enableTransgerBookingForTodayOnly" :value="enableTransgerBookingForTodayOnly" name="enableTransgerBookingForTodayOnly" class="" type="checkbox">
			<label class="pt-2">Transfer booking for only today</label>
		</div>
		<div v-if="!enableTransgerBookingForTodayOnly" class="space-y-4">
			<div class="">
				<label class="font-light text-sm">Start Date (Today)</label>
				<input readonly :value="todaysDate" class="w-full input-field border outline-none py-2 text-xs px-3 rounded-md">
			</div>
			<div class="">
				<label class="font-light text-sm">End Date</label>
				<InputDateInput id="startDate" v-model="form.endDate" class="font-light  w-full" placeholder="Filter by date" />
			</div>
		</div>
		<div class="flex justify-between items-center gap-x-10 pt-6">
			<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full"
				@click="useTripsModal().closeTransferBooking()">
				Cancel
			</button>
			<button :disabled="!isFormEmpty" type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25"
				@click="handleFirstStep">
				<span v-if="!processingBooking" class="text-xs">Continue</span>
				<Spinner v-else />
			</button>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useItinerariesByRouteId } from '@/composables/modules/routes/id'
import { useVehiclesByItineraryId } from '@/composables/modules/routes/vehicles/fetch'
import { useTripsModal } from '@/composables/core/modals'
const { routeItineraries, loading: loadingItineraries, getRouteItinerariesByRouteId } = useItinerariesByRouteId()
const { getVehiclesByItineraryId, loadingVehicles, itinerariesVehicles } = useVehiclesByItineraryId()
  const props = defineProps({
	bookingTransferActiveStep: {
		type: String,
		default: '1'
	},
	processingBooking: {
		type: Boolean,
		default: false
	}
  })

const form = reactive({
    selectedRoute: null,
    route_itinerary_id: '',
    selectedVehicle: null,
    selectedItinerary: null,
    endDate: ''
})

const todaysDate = computed(() => {
	return useDateFormat(new Date(), 'YYYY-MM-DD').value
})
const enableTransgerBookingForTodayOnly = ref(true)

const isFormEmpty = computed(() => {
    return !!((form.selectedItinerary && form.selectedRoute && form.selectedVehicle) || form.endDate)
})

const emits = defineEmits(['routeDescription', 'itineraryDescription', 'stepFormComplete'])
const routeSelected = (val: any) => {
	form.selectedRoute = val
	emits('routeDescription', val)
}

watch(() => form.selectedItinerary, (val) => {
   if (val) {
    getVehiclesByItineraryId(val.id)
	emits('itineraryDescription', val)
   }
})

watch(() => form.selectedRoute, (val) => {
	if (val) {
		getRouteItinerariesByRouteId(form?.selectedRoute?.id)
	}
})

const handleFirstStep = (val: any) => {
	emits('stepFormComplete', form)
}

</script>
