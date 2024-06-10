<template>
	<main class="relative">
		<div class="z-0 h-[88vh]">
			<MapDisplay :start-point="convertLatLngStringToObj(selectedTrip.route?.pickup_coordinate)"
				:end-point="convertLatLngStringToObj(selectedTrip.route?.destination_coordinate)" :encoded-polyline="selectedTrip.route?.overview_polyline" height="100%" :loading="loading" :external-markers="[]" />
		</div>
		<section class="absolute top-4 left-[100px]  flex flex-col items-start z-40">
			<ButtonGoBack :url="`/trips/type/${tripType}`" class="mb-4 mt-8 " />
			<div class="card p-0 !max-w-4xl md:w-[500px] z-[20] ">
				<div class="card-header p-4">
					Trip Information
				</div>
				<div class="card-body p-4 overflow-auto h-[calc(100vh-300px)]">
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
								<nuxt-link v-if="col.name === 'Driver'" :to="`/drivers/${selectedTrip.driver.id}/driver-info`" class="text-blue-700">
									{{ col.value }}
								</nuxt-link>
								<StatusBadge v-else-if="col.value === 'status'" :name="tripType" />
								<div v-else-if="col.name === 'Route Code'">
									<nuxt-link :to="`/trips/routes/${selectedTrip?.route?.id}/details`" class="text-blue-700">
										{{ col.value }}
									</nuxt-link>
								</div>
								<div v-else-if="col.name === 'Vehicle'">
									<nuxt-link :to="`/fleet/${selectedTrip?.vehicle?.id}/vehicle-info`" class="text-blue-700">
										{{ col.value }}
									</nuxt-link>
								</div>
								<div v-else-if="col.name === 'Partner'">
									<nuxt-link v-if="selectedTrip?.vehicle?.partner?.id" :to="`/partners/${selectedTrip?.vehicle?.partner?.id}/${selectedTrip?.vehicle?.partner?.account_sid}/partner-info`" class="text-blue-700">
										{{ col.value }}
									</nuxt-link>
									<span v-else>N/A</span>
								</div>
								<RouteDescription v-else-if="col.value === 'route'" :pickup="selectedTrip?.route?.pickup" :destination="selectedTrip?.route?.destination" />
								<span v-else>{{ col.value }} </span>
							</li>
						</ul>
					</template>
				</div>
			</div>
		</section>

		<section class="flex justify-between items-center  absolute p-3  top-[40%] z-30 inset-x-6">
			<button class="btn-controls" @click="$emit('prev')">
				<Icon name="prev" class="w-7" />
			</button>
			<button class="btn-controls" @click="$emit('next')">
				<Icon name="next2" class="w-7" />
			</button>
		</section>

		<transition
			appear
			name="list"
		>
			<ModulesTripsPassengerDetails :selected-trip="selectedTrip" />
		</transition>
	</main>
</template>

<script lang="ts" setup>
import moment from 'moment'
import { useDateFormat } from '@vueuse/core'
import { convertToCurrency, convertLatLngStringToObj } from '@/composables/utils/formatter'

defineEmits(['next', 'prev'])
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
		{ name: 'Started At', value: `${moment.utc(props?.selectedTrip?.trip_date_time).format('Do MMMM, YYYY | h:mm A') ?? moment.utc(props?.selectedTrip?.trip_date_time).format('Do MMMM, YYYY h:mm A')}` },
		 // trip_date_time is the standard basically but in a situation where it is not available use "trip_date" which is the edge case as at the time this comment was made
		{ name: 'Distance', value: props.selectedTrip?.route?.distance || 'N/A' },
		{ name: 'Duration', value: props.selectedTrip?.route?.duration || 'N/A' },
		{ name: 'Status', value: 'status' },
		{ name: 'Route Code', value: props.selectedTrip?.route?.route_code },
		{ name: 'Driver', value: `${props.selectedTrip.driver.fname} ${props.selectedTrip.driver.lname}` },
		{ name: 'Driver\'s Phone', value: `${props.selectedTrip.driver.phone}` },
		{ name: 'Vehicle', value: `${vehicleData.value?.brand} ${vehicleData.value?.name} (${vehicleData.value?.registration_number})` },
		{ name: 'Partner', value: `${props.selectedTrip?.vehicle?.partner?.company_name}` },
		{ name: 'Partner Phone', value: `${props.selectedTrip?.vehicle?.partner?.company_phone}` }
	]
})

const tripType = computed(() => (useRoute().name as string).split('-')[2])

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.btn-controls{
	@apply bg-white p-2 rounded-full border border-dark
}

</style>
