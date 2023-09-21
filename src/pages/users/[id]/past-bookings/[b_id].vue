<template>
	<main class="flex flex-col gap-5 items-start">
		<ButtonGoBack />

		<section v-if="!loading" class="w-full flex gap-8">
			<div class="card p-6 w-2/3">
				<h1 class="font-bold text-sm">
					Trip Information
				</h1>
				<ul class="py-5 border-b mt-5">
					<li v-for="col in firstCol" :key="col.name" class="flex flex-wrap gap-4 justify-between items-center px-4 py-2   text-sm">
						<span class="font-medium">{{ col.name }} </span>
						<span class="text-grey5">{{ col.value }} </span>
					</li>
				</ul>

				<ul class="py-5 border-b mt-5">
					<li class="flex flex-wrap gap-4 justify-between items-center px-4 py-2 text-sm">
						<div class="font-medium flex gap-4 items-start">
							<svg_template code="pickup-sm" class="mt-0.5" />
							<span>
								<p class="font-bold">Pick-up</p>
								<p class="text-grey5">{{ pastBooking.route.pickup }}</p>

							</span>
						</div>
						<span class="text-grey5">
							<p>{{ useDateFormat(pastBooking.userRoute.start_date, 'MM-DD-YY').value }} </p>
							<p>{{ pastBooking?.itinerary?.trip_time }}</p>
						</span>
					</li>
					<li class="flex flex-wrap gap-4 justify-between items-center px-4 py-2 text-sm">
						<div class="font-medium flex gap-4 items-start">
							<svg_template code="destination-sm" />
							<span>
								<p class="font-bold">Drop off</p>
								<p class="text-grey5">{{ pastBooking.route.destination_label }}</p>

							</span>
						</div>
						<span class="text-grey5">
							<p>{{ useDateFormat(pastBooking.userRoute.start_date, 'MM-DD-YY').value }} </p>
							<!-- <p>{{ pastBooking?.itinerary?.trip_time }}</p> -->
						</span>
					</li>
				</ul>
				<ul class="py-5 border-b mt-5">
					<li v-for="col in secondCol" :key="col.name" class="flex flex-wrap gap-4 justify-between items-center px-4 py-2   text-sm">
						<span class="font-medium">{{ col.name }} </span>
						<span class="text-grey5">{{ col.value }} </span>
					</li>
				</ul>
				<div class="flex py-5  mt-1 items-center gap-2">
					<Avatar :name="pastBooking.driver.fname" />
					<div class="flex flex-col text-xs">
						<p>Driver</p>
						<nuxt-link :to="`/drivers/${pastBooking.driver.id}/driver-info`" class="underline">
							{{ pastBooking.driver.fname }} {{ pastBooking.driver.lname }}
						</nuxt-link>
					</div>
				</div>
				<div class="flex w-full mt-4">
					<button class="btn-primary w-full" @click="useUserModal().openUserRefund()">
						Refund
					</button>
				</div>
			</div>

			<MapDisplay :start-point="pastBooking.userRoute.pickupRouteBusStop.geometry" :end-point="pastBooking.userRoute.destinationRouteBusStop.geometry" />
		</section>
		<Skeleton v-else height="500px" radius="10px" />
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import svg_template from '@/assets/icons/src/svg-template.vue'
import { usePageHeader } from '@/composables/utils/header'
import { useUserPastBookingsById } from '@/composables/modules/users/inner/past-bookings'
import { useUserModal } from '@/composables/core/modals'

const { getUserPastBookingsById, loading, pastBooking } = useUserPastBookingsById()
const id = useRoute().params.b_id as string
getUserPastBookingsById(id)

const tripDays = computed(() => {
	if (!pastBooking.value) return ''
	const uniqueDays = new Set(pastBooking.value.userRoute.selected_days || [])
	  return pastBooking.value.userRoute.selected_days.length
          ? Array.from(uniqueDays)
            .map((obj:any) => obj.slice(0, 3))
            .join(', ')
          : ''
})

const firstCol = computed(() => {
	if (!pastBooking.value) return []
	const items = [
		{ name: 'Ticket Type', value: pastBooking.value.recurring ? 'Subscription' : 'Single' },
		{ name: 'Ticket Number', value: pastBooking.value.bus_pass },
		{ name: 'Trip days', value: tripDays.value },
		{ name: 'Route Code', value: pastBooking.value.route.route_code },
		{ name: 'Trip Amount', value: pastBooking.value.userRoute.cost }
	]
	 if (pastBooking.value.userRoute.recurring) {
    const validityItem = {
      name: 'Validity',
      value: `${useDateFormat(pastBooking.value.userRoute.start_date, 'MM-dd-yy').value} to ${useDateFormat(pastBooking.value.userRoute.end_date, 'MM-dd-yy').value}`
    }
    items.splice(3, 0, validityItem)
	 }
   return items
})
const secondCol = computed(() => {
	if (!pastBooking.value) return []
	return [
		{ name: 'Vehicle', value: `${pastBooking.value.vehicle.brand} ${pastBooking.value.vehicle.name} - ${pastBooking.value.vehicle.type}` },
		{ name: 'Plate Number', value: pastBooking.value.vehicle.registration_number || 'N/A' }
]
})

usePageHeader().setPageHeader({
	preTitle: 'OVERVIEW',
	title: 'Past Booking Details'

})
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
