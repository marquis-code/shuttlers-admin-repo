<template>
	<div class="space-y-8">
		<div class="flex items-center gap-x-6">
			<div class="flex items-center gap-x-2">
				<input id="all" v-model="form.all" name="all" type="checkbox">
				<label for="all" class="font-medium pt-2">Select all passengers</label>
			</div>
			<div class="flex items-center gap-x-3">
				<div class="flex items-center gap-x-1 cursor-pointer" @click="seePickups">
					<input value="pickup" name="manifestFilter" :checked="filterType === 'pickup'" type="radio"
						@change="filterType = 'pickup'">
					<label for="pickup" class="font-medium pt-2">Pick ups</label>
				</div>
				<div class="flex items-center gap-x-1 cursor-pointer" @click="seeDropoffs">
					<input value="dropoff" name="manifestFilter" :checked="filterType === 'dropoff'" type="radio"
						@change="filterType = 'dropoff'">
					<label for="dropoff" class="font-medium pt-2">Drop offs</label>
				</div>
			</div>
		</div>
		<div v-if="form.all" class="flex justify-between items-center">
			<button v-if="!hasCheckboxSelected"
				class="border-black border font-medium bg-white text-black px-3 py-2 text-xs rounded-md"
				@click="handleNotification(routePassengers, 'bulk')">
				Notify Selected
			</button>
			<button v-else class="border-black border font-medium bg-white text-black px-3 py-2 text-xs rounded-md"
				@click="notifySelectedUsers">
				Notify Selected
			</button>
			<button class="border-black border font-medium bg-white text-black px-3 py-2 text-xs rounded-md"
				@click="useTripsModal().openTransferBooking()">
				Transfer Booking
			</button>
		</div>
		<div v-if="filterType === 'pickup'" class="space-y-6">
			<section v-for="(val, key, idx) in groupByPickup(routePassengers)" :key="idx"
				class="shadow-sm border rounded-md bg-white">
				<div class="flex justify-between items-center border-b py-3 px-6">
					<div class="space-y-2">
						<div class="flex items-center">
							<img src="@/assets/icons/source/green-location.svg" alt="">
							<p class="font-bold">
								{{ val.busstopname }}
							</p>
						</div>
						<p class="text-xs font-medium">
							{{ val.passengers.length }} passenger(s)
						</p>
					</div>
					<button class="text-sm bg-black text-white px-3 py-2 rounded-md"
						@click="handleNotification(val.passengers, 'bulk')">
						Notify Bus-Stop
					</button>
				</div>
				<div v-for="(itm, idx) in val.passengers" :key="idx"
					class="flex justify-between items-center px-6 py-3">
					<div>
						<label :for="itm.id">
							<input :id="itm.id" :checked="isChecked" type="checkbox" name="checked_all" @change="toggleSelection($event, itm)">
						</label>
					</div>
					<div class="flex items-center gap-x-2">
						<Avatar :name="itm.user.fname" bg="#B1C2D9" />
						<div>
							<p>{{ itm?.user?.fname }} {{ itm?.user?.lname }}</p>
							<p>{{ itm?.user?.email }}</p>
						</div>
					</div>
					<div>
						<RouteDescription class="text-xs" :pickup="itm?.pickup?.location"
							:destination="itm?.destination?.location" />
					</div>
					<div>{{ itm?.user?.phone }}</div>
					<div>{{ itm?.created_at }}</div>
					<div class="text-xs px-3 py-1.5"
						:class="[itm?.check_in_status === 'pending' ? 'bg-gray-600 text-white rounded-md' : '']">
						{{ itm?.check_in_status }}
					</div>
					<div class="cursor-pointer" @click="handleNotification(itm, 'single')">
						<img src="@/assets/icons/source/blue-notification.svg" alt="">
					</div>
				</div>
			</section>
		</div>

		<div v-if="filterType === 'dropoff'" class="space-y-6">
			<section v-for="(val, key, idx) in groupByDestination(routePassengers)" :key="idx"
				class="shadow-sm border rounded-md bg-white">
				<div class="flex justify-between items-center border-b py-3 px-6">
					<div class="space-y-2">
						<div class="flex items-center">
							<img src="@/assets/icons/source/green-location.svg" alt="">
							<p class="font-bold">
								{{ val.busstopname }}
							</p>
						</div>
						<p class="text-xs font-medium">
							{{ val.passengers.length }} passenger(s)
						</p>
					</div>
					<button class="text-sm bg-black text-white px-3 py-2 rounded-md"
						@click="handleNotification(val.passengers, 'bulk')">
						Notify Bus-Stop
					</button>
				</div>
				<div v-for="(itm, idx) in val.passengers" :key="idx"
					class="flex justify-between items-center px-6 py-3">
					<div>
						<label :for="itm.id">
							<input :id="itm.id" :checked="isChecked" type="checkbox" name="checked_all"
								@change="toggleSelection($event, itm)">
						</label>
					</div>
					<div class="flex items-center gap-x-2">
						<Avatar :name="itm.user.fname" bg="#B1C2D9" />
						<div>
							<p>{{ itm?.user?.fname }} {{ itm?.user?.lname }}</p>
							<p>{{ itm?.user?.email }}</p>
						</div>
					</div>
					<div>
						<RouteDescription class="text-xs" :pickup="itm?.pickup?.location"
							:destination="itm?.destination?.location" />
					</div>
					<div>{{ itm?.user?.phone }}</div>
					<div>{{ itm?.created_at }}</div>
					<div class="text-xs px-3 py-1.5"
						:class="[itm?.check_in_status === 'pending' ? 'bg-gray-600 text-white rounded-md' : '']">
						{{ itm?.check_in_status }}
					</div>
					<div class="cursor-pointer" @click="handleNotification(itm, 'single')">
						<img src="@/assets/icons/source/blue-notification.svg" alt="">
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTripsModal } from '@/composables/core/modals'
import { useNotifyPassenger } from '@/composables/modules/trips/passengers'
const { busstopUsersIds } = useNotifyPassenger()
const props = defineProps({
	routePassengers: {
		type: Array,
	  required: true,
	  default: () => []
	}
})
const groupByPickup = (objectsArray) => {
	const groupedObject = objectsArray.reduce((accumulator, currentObject) => {
		const pickupKey = currentObject?.pickupRouteBusStop?.id || currentObject?.pickup.location
		const busstopname = currentObject?.pickupRouteBusStop?.name || currentObject?.pickup.location

		if (!accumulator[pickupKey]) {
			accumulator[pickupKey] = { busstopname, passengers: [] }
		}

		accumulator[pickupKey].passengers.push(currentObject)

		return accumulator
	}, {})

	return groupedObject
}

const groupByDestination = (objectsArray) => {
	const groupedObject = objectsArray.reduce((accumulator, currentObject) => {
		const destinationKey = currentObject?.destinationRouteBusStop?.id || currentObject?.destination.location
		const busstopname = currentObject?.destinationRouteBusStop?.name || currentObject?.destination.location

		if (!accumulator[destinationKey]) {
			accumulator[destinationKey] = { busstopname, passengers: [] }
		}

		accumulator[destinationKey].passengers.push(currentObject)

		return accumulator
	}, {})

	return groupedObject
}

const handleNotification = (itm: any, type: string) => {
	if (type === 'bulk') {
		busstopUsersIds.value = itm.map((passenger) => passenger.user_id)
	}

	if (type === 'single') {
		busstopUsersIds.value.push(itm.user_id)
	}

	useTripsModal().openNotifyPassengers()
}

const seeDropoffs = () => {
	filterType.value = 'dropoff'
}

const seePickups = () => {
	filterType.value = 'pickup'
}

const notifySelectedUsers = () => {
	busstopUsersIds.value = selectedCheckboxes.value
	useTripsModal().openNotifyPassengers()
}
const toggleSelection = (e, val) => {
	form.all = true
	selectedCheckboxes.value.push(val.user_id)
}

const form = reactive({
	all: false
})

const filterType = ref('pickup')
const selectedCheckboxes = ref([]) as any
const hasCheckboxSelected = ref(false)
const isChecked = ref(false)
</script>

<style>

</style>
