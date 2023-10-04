<template>
	<main class="relative">
		<div class="h-screen inset-0 z-0">
			<MapDisplay :start-point="convertLatLngStringToObj(selectedTrip.route?.pickup_coordinate)"
				:end-point="convertLatLngStringToObj(selectedTrip.route?.destination_coordinate)" :encoded-polyline="selectedTrip.route?.overview_polyline" height="100vh" :loading="loading" :external-markers="[]" />
		</div>
		<section class="absolute top-4 left-6 flex flex-col items-start z-40">
			<ButtonGoBack class="mb-6 bg-white" />
			<div class="card !max-w-4xl md:w-[500px] z-[200000]">
				<div class="card-header ">
					Trip Information
				</div>
				<div class="card-body">
					<h5 v-if="Object.keys(selectedTrip).length === 0 && !loading" class="text-small text-center">
						No Trip Detail available
					</h5>
					<div v-else-if="loading" class="flex justify-content-center align-items-center">
						<Skeleton height="500px" />
					</div>
					<template v-else>
						<ul class="py-3">
							<li v-for="col in tripCol" :key="col.name" class="flex flex-wrap gap-4 justify-between items-center  py-3  border-b text-sm">
								<span class="font-medium">{{ col.name }} </span>

								<RouteDescription v-if="col.value === 'route'" :pickup="selectedTrip?.route?.pickup" :destination="selectedTrip?.route?.destination" />
								<StatusBadge v-else-if="col.value === 'status'" :name="selectedTrip?.route?.status ? 'Active' : 'Inactive'" />
								<span v-else>{{ col.value }} </span>
							</li>
						</ul>
					</template>
				</div>
			</div>
		</section>
	</main>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { convertToCurrency, convertLatLngStringToObj } from '@/composables/utils/formatter'

const props = defineProps({
    selectedTrip: {
        type: Object,
        default: () => {},
        required: true
    },
    loading: {
        type: Boolean,
        default: false,
        required: false
    }
})
	const vehicleData = computed(() => {
      return props.selectedTrip?.vehicle || props.selectedTrip?.driver?.vehicle
    })

const tripCol = computed(() => {
	return [
		{ name: 'Route', value: 'route' },
		{ name: 'Started At', value: ` ${useDateFormat(props.selectedTrip.trip_date, 'DD MMM YYYY').value},  ${props.selectedTrip?.route_vehicle?.route_itinerary?.trip_time}` },
		{ name: 'Distance', value: props.selectedTrip?.route?.distance || 'N/A' },
		{ name: 'Duration', value: props.selectedTrip?.route?.duration || 'N/A' },
		{ name: 'Status', value: 'status' },
		{ name: 'Route Code', value: props.selectedTrip?.route?.route_code },
		{ name: 'Driver', value: `${props.selectedTrip.driver.fname} ${props.selectedTrip.driver.lname}` },
		{ name: 'Driver\'s Phone', value: `${props.selectedTrip.driver.phone}` },
		{ name: 'Vehicle', value: `${vehicleData.value?.brand} ${vehicleData.value?.name} (${vehicleData.value?.registration_number})` },
		{ name: 'Partner', value: `${props.selectedTrip?.vehicle?.partner?.company_name}` }
	]
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>

<style scoped></style>
