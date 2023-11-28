<template>
	<section class="mx-10 mt-14 space-y-6">
		<div class="h-16 bg-white shadow-sm border-[0.4px] rounded-md p-3 w-full flex items-center justify-end">
			<div class="flex justify-end items-end">
				<button class="bg-black text-white px-2 py-2.5 text-xs rounded-md" @click="useTripsModal().openAddPassengersToTrips()">
					Add passengers
				</button>
			</div>
		</div>
		<div class="flex items-center gap-x-6">
			<div class="flex items-center gap-x-2">
				<input id="all" v-model="form.all" name="all" type="checkbox">
				<label for="all" class="font-medium pt-2">Select all passengers</label>
			</div>
			<div class="flex items-center gap-x-3">
				<div class="flex items-center gap-x-1 cursor-pointer" @click="seePickups">
					<input value="pickup" name="manifestFilter" :checked="filterType === 'pickup'" type="radio" @change="filterType = 'pickup'">
					<label for="pickup" class="font-medium pt-2">Pick ups</label>
				</div>
				<div class="flex items-center gap-x-1 cursor-pointer" @click="seeDropoffs">
					<input value="dropoff" name="manifestFilter" :checked="filterType === 'dropoff'" type="radio" @change="filterType = 'dropoff'">
					<label for="dropoff" class="font-medium pt-2">Drop offs</label>
				</div>
			</div>
		</div>
		<div v-if="form.all" class="flex justify-between items-center">
			<button class="border-black border font-medium bg-white text-black px-3 py-2 text-xs rounded-md" @click="useTripsModal().openNotifyPassengers()">
				Notify Selected
			</button>
			<button class="border-black border font-medium bg-white text-black px-3 py-2 text-xs rounded-md" @click="useTripsModal().openTransferBooking()">
				Transfer Booking
			</button>
		</div>
		<section v-for="(itm, idx) in dummy" :key="idx" class="shadow-sm border rounded-md bg-white">
			<div class="flex justify-between items-center border-b py-3 px-6">
				<div class="space-y-1">
					<div class="flex items-center">
						<img src="@/assets/icons/source/green-location.svg" alt="">
						<p class="font-bold">
							{{ itm.pickup }}
						</p>
					</div>
					<p class="text-xs">
						{{ dummy.length + 1 }} passenger(s)
					</p>
				</div>
				<button class="text-sm bg-black text-white px-3 py-2 rounded-md" @click="useTripsModal().openNotifyPassengers()">
					Notify Bus-Stop
				</button>
			</div>
			<div class="flex justify-between items-center px-6 py-3">
				<div class="flex items-center gap-x-2">
					<Avatar :name="itm.name" bg="#B1C2D9" />
					<div>
						<p>{{ itm.name }}</p>
						<p>{{ itm.email }}</p>
					</div>
				</div>
				<div>
					<RouteDescription class="text-xs" :pickup="itm.pickup" :destination="itm.dropoff" />
				</div>
				<div>{{ itm.phone }}</div>
				<div>{{ itm.date }}</div>
				<div class="text-xs px-3 py-1.5" :class="[itm.status === 'pending' ? 'bg-gray-500 text-white rounded-md' : '']">
					{{ itm.status }}
				</div>
				<div class="cursor-pointer" @click="useTripsModal().openNotifyPassengers()">
					<img src="@/assets/icons/source/blue-notification.svg" alt="">
				</div>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">
import { useRouteBusstopsByRouteId, useRouteUpcomingTripsPassengersByTripId } from '@/composables/modules/routes/id'
import { useTripsModal } from '@/composables/core/modals'
const { selectedRoute, loading: loadingRouteBusstops, getRouteBustopsById, busstops } = useRouteBusstopsByRouteId()
const { passengersList, loading: loadingTripPassengers, getRouteTripsPassengersById } = useRouteUpcomingTripsPassengersByTripId()
const id = useRoute().params.id as string
definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})
getRouteTripsPassengersById(id)
getRouteBustopsById(id)
const filterType = ref('pickup')
const form = reactive({
	all: false
})
const dummy = reactive([
	{
		name: 'Tiffany Young',
		email: 'fany@mailinator.com',
		pickup: 'Super Bus Stop',
		dropoff: 'Jibowu Bus Stop',
		phone: '08118554713',
		date: 'Nov 21, 2023 10:10 AM',
		status: 'pending'
	},
	{
		name: 'Tiffany Young',
		email: 'fany@mailinator.com',
		pickup: 'Super Bus Stop',
		dropoff: 'Jibowu Bus Stop',
		phone: '08118554713',
		date: 'Nov 21, 2023 10:10 AM',
		status: 'pending'
	}
])

const seeDropoffs = () => {
	filterType.value = 'dropoff'
}

const seePickups = () => {
	filterType.value = 'pickup'
}
</script>

<style scoped>

</style>
