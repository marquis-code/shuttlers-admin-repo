<template>
	<main class="flex flex-col gap-4">
		<ButtonGoBack :url="`/users/${userId}/active-bookings`" />
		<Skeleton v-if="loading" height="200px" class="max-w-[400px]" />
		<div v-else class="flex flex-col gap-4 lg:flex-row lg:items-start">
			<div class="bg-light border rounded-md p-4 w-full max-w-[400px] flex flex-col gap-4">
				<h3 class="text-base font-medium text-grey3">
					Trip Information
				</h3>

				<div class="flex flex-col gap-4 p-2">
					<div class="flex flex-col gap-4">
						<!-- eslint-disable-next-line vue/no-v-for-template-key -->
						<template v-for="n in info" :key="n.key">
							<div v-if="!n.hide" class="flex items-center gap-4 justify-between">
								<p class="text-sm font-medium text-dark">
									{{ n.key }}
								</p>
								<p class="text-sm text-grey5">
									{{ n.value }}
								</p>
							</div>
						</template>
					</div>

					<div class="border-t" />

					<div class="flex flex-col gap-3">
						<div v-for="n in pickup_drop_info" :key="n.key" class="flex items-center gap-4 justify-between">
							<div class="flex items-start gap-0">
								<icon :name="n.icon" class="w-7" />
								<div class="flex flex-col text-sm">
									<p class="text-dark font-medium">
										{{ n.key }}
									</p>
									<p class="text-grey5">
										{{ n.value }}
									</p>
								</div>
							</div>
							<div class="flex flex-col text-grey5 text-sm text-right">
								<p>{{ n.date }}</p>
								<p>{{ n.time }}</p>
							</div>
						</div>
					</div>

					<div class="border-t" />

					<div class="flex items-center gap-2">
						<Avatar :src="ticketDetails?.driver?.avatar" :name="ticketDetails?.driver?.fname" />
						<div class="flex flex-col">
							<p class="text-sm text-grey5">
								Driver
							</p>
							<NuxtLink :to="`/drivers/${ticketDetails?.driver?.id}/driver-info`" class="text-sm text-dark underline font-medium">
								{{ ticketDetails?.driver?.fname }} {{ ticketDetails?.driver?.lname }}
							</NuxtLink>
						</div>
					</div>

					<button v-if="ticketDetails.booking_status === 'active'" class="p-3 w-full rounded-md bg-dark text-light text-sm mt-[70px]"
						@click="useUserModal().openCancelBooking()"
					>
						Cancel Booking
					</button>
				</div>
			</div>
			<div class="flex-grow min-h-[400px] rounded-2xl border overflow-hidden">
				<GMapMap map-type-id="terrain" class="h-[400px]"
					:options="{
						zoomControl: true,
						mapTypeControl: false,
						scaleControl: true,
						streetViewControl: false,
						rotateControl: false,
						fullscreenControl: false
					}"
					:center="center" :zoom="11"
				>
					<GMapPolyline ref="polyline" :path="path" />
					<GMapMarker v-for="(n, index) in marker" :key="index"
						:position="{ lat: n.lat, lng: n.lng }"
						:icon="n.icon"
					/>
				</GMapMap>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useBookingTicket } from '@/composables/modules/users/booking-ticket/fetch'
import PickupPoint from '@/assets/icons/source/pickup_point.svg'
import DestinationPoint from '@/assets/icons/source/destination_point_green.svg'
import { useUserModal } from '@/composables/core/modals'

const { loading, fetchTicketDetails, ticketDetails } = useBookingTicket()
const userId = useRoute().params.id as string
const ticket_id = useRoute().params.ticket_id as string

const tripDays = computed(() => {
	return ticketDetails.value?.selected_days.map((el) => {
		return el.slice(0, 3)
	}).join(', ')
})

const center = computed(() => {
	const x = Math.ceil(path.value.length / 2)
	return path.value[x]
})
const marker = computed(() => {
	return [
		{ lng: ticketDetails.value?.pickupRouteBusStop?.geometry?.x, lat: ticketDetails.value?.pickupRouteBusStop?.geometry?.y, icon: PickupPoint },
		{ lng: ticketDetails.value?.destinationRouteBusStop?.geometry?.x, lat: ticketDetails.value?.destinationRouteBusStop?.geometry?.y, icon: DestinationPoint }
	]
})
const path = computed(() => {
	return ticketDetails.value?.route?.geometry.map((el) => {
		return {
			lng: el.x,
			lat: el.y
		}
	})
})

const info = computed(() => {
	return [
		{ key: 'Ticket Type', value: ticketDetails.value?.recurring ? 'Subscription' : 'Single' },
		{ key: 'Ticket Number', value: ticketDetails.value?.bus_pass || 'N/A' },
		{ key: 'Trip days', value: tripDays.value, hide: !ticketDetails.value?.recurring },
		{ key: 'Validity', value: `${moment(ticketDetails.value?.start_date).format('ll')} - ${moment(ticketDetails.value?.end_date).format('ll')}`, hide: !ticketDetails.value?.recurring },
		{ key: 'Route Code', value: ticketDetails.value?.route?.route_code || 'N/A' },
		{ key: 'Trip Amount', value: ticketDetails.value?.cost }
	]
})

const pickup_drop_info = computed(() => {
	return [
		{ key: 'Pick-up', value: ticketDetails.value?.pickup?.location || 'N/A', icon: 'pickup_point', date: moment(ticketDetails.value?.start_date).format('ll'), time: ticketDetails.value?.itinerary?.trip_time || 'N/A' },
		{ key: 'Drop-off', value: ticketDetails.value?.destination?.location || 'N/A', icon: 'destination_point_green', date: moment(ticketDetails.value?.start_date).format('ll'), time: addSecondsToTime(ticketDetails.value?.itinerary?.trip_time, ticketDetails.value?.route?.duration_value) }
	]
})

function addSecondsToTime(inputTime:string, secondsToAdd:number) {
    const timeComponents = inputTime.split(':')
    let hours = parseInt(timeComponents[0], 10)
    const minutes = parseInt(timeComponents[1].split(' ')[0], 10)
    const ampm = timeComponents[1].split(' ')[1].toUpperCase()

    if (ampm === 'PM' && hours < 12) {
        hours += 12
    } else if (ampm === 'AM' && hours === 12) {
        hours = 0
    }
    const totalSeconds = (hours * 3600) + (minutes * 60) + secondsToAdd
	const duration = moment.duration(totalSeconds, 'seconds')
    const formattedTime = moment.utc(duration.asMilliseconds()).format('LT')
    return formattedTime
}

fetchTicketDetails()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>
label,span,p{
	margin: 0 !important;
}
</style>
