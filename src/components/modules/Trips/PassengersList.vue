<template>
	<section class="flex gap-5 w-full items-center justify-between pb-[100px]">
		<button v-if="isScreenLg" class="btn-controls" @click="$emit('prev')">
			<Icon name="prev" class="w-7" />
		</button>
		<div v-if="routePassengers.length" :key="key" class="space-y-8 w-full lg:w-[calc(100%-130px)]">
			<div class="flex items-center gap-x-6">
				<div class="flex items-center gap-x-2">
					<input id="all" v-model="selected_all_passengers" name="all" type="checkbox">
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
			<div v-if="selected_all_passengers || selectedCheckboxes?.length" class="flex justify-between items-center">
				<button v-if="selected_all_passengers" class="border-black border font-medium bg-white text-black px-3 py-2 text-xs rounded-md" @click="handleNotification(routePassengers, 'bulk')">
					Notify Selected
				</button>
				<button v-else class="border-black border font-medium bg-white text-black px-3 py-2 text-xs rounded-md" @click="notifySelectedUsers">
					Notify Selected
				</button>
				<button class="border-black border font-medium bg-white text-black px-3 py-2 text-xs rounded-md" @click="useTripsModal().openTransferBooking()">
					Transfer Booking
				</button>
			</div>
			<div v-if="filterType === 'pickup'" class="space-y-6">
				<section v-for="(val, key, idx) in computedGroupByPickup" :key="idx" class="shadow-sm border rounded-md bg-white w-full">
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
						<button class="text-sm bg-black text-white px-3 py-2 rounded-md" @click="handleNotification(val.passengers, 'bulk')">
							Notify Bus-Stop
						</button>
					</div>
					<div class="overflow-auto w-full">
						<div v-for="(item, idx) in val.passengers" :key="idx"
							class="flex justify-between items-center gap-4 px-6 py-3 min-w-[800px]"
						>
							<div class="">
								<label :for="item.id">
									<input :id="item.id" :checked="selectedCheckboxes.includes(item?.user_id) || selected_all_passengers" type="checkbox" name="checked_all" @click.prevent="toggleSelection(item)">
								</label>
							</div>
							<div class="flex items-center gap-x-2">
								<Avatar :name="item.user.fname" bg="#B1C2D9" class="shrink-0" />
								<div>
									<p>{{ item?.user?.fname }} {{ item?.user?.lname }}</p>
									<p class="text-sm">
										{{ item?.user?.email }}
									</p>
								</div>
							</div>
							<div class="">
								<RouteDescription class="text-xs" :pickup="item?.pickup?.location" :destination="item?.destination?.location" />
							</div>
							<p class="">
								{{ item?.user?.phone }}
							</p>
							<p class="whitespace-nowrap">
								{{ moment(item?.created_at).format('ll') }}
							</p>
							<div class="text-xs px-3 py-1.5 text-white rounded-full text-center whitespace-nowrap" :class="[item?.check_in_status === 'pending' ? 'bg-gray-600 rounded-md' : item?.check_in_status === 'no-show' ? 'bg-rose-600' : 'bg-shuttlersGreen']">
								{{ item?.check_in_status }}
							</div>
							<img src="@/assets/icons/source/blue-notification.svg" class="w-6 cursor-pointer" alt="" @click="handleNotification(item, 'single')">
						</div>
					</div>
				</section>
			</div>

			<div v-if="filterType === 'dropoff'" class="space-y-6">
				<section v-for="(val, key, idx) in computedGroupByDestination" :key="idx" class="shadow-sm border rounded-md bg-white w-full">
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
						<button class="text-sm bg-black text-white px-3 py-2 rounded-md" @click="handleNotification(val.passengers, 'bulk')">
							Notify Bus-Stop
						</button>
					</div>
					<div class="overflow-auto w-full">
						<div v-for="(item, idx) in val.passengers" :key="idx" class="flex justify-between items-center gap-4 px-6 py-3 min-w-[800px]">
							<div class="">
								<label :for="item.id">
									<input :id="item.id" :checked="selectedCheckboxes.includes(item?.user_id) || selected_all_passengers" type="checkbox" name="checked_all" @click.prevent="toggleSelection(item)">
								</label>
							</div>
							<div class="space-y-2">
								<div class="flex items-center gap-x-2">
									<Avatar :name="item.user.fname" bg="#B1C2D9" class="shrink-0" />
									<div>
										<p>{{ item?.user?.fname }} {{ item?.user?.lname }}</p>
										<p>{{ item?.user?.email }}</p>
									</div>
								</div>
								<div>
									<span v-if="item?.is_first_booking" class="bg-shuttlersGreen text-white text-xs rounded-md px-3 py-1.5">
										{{ item?.is_first_booking ? 'New' : '' }}
									</span>
								</div>
							</div>
							<div class="">
								<RouteDescription class="text-xs" :pickup="item?.pickup?.location" :destination="item?.destination?.location" />
							</div>
							<p class="">
								{{ item?.user?.phone }}
							</p>
							<p class="whitespace-nowrap">
								{{ moment(item?.created_at).format('ll') }}
							</p>
							<div class="text-xs px-3 py-1.5 text-white rounded-full text-center whitespace-nowrap" :class="[item?.check_in_status === 'pending' ? 'bg-gray-600 rounded-md' : item?.check_in_status === 'no-show' ? 'bg-rose-600' : 'bg-shuttlersGreen']">
								{{ item?.check_in_status }}
							</div>
							<!-- <div class="cursor-pointer  ml-3" @click="handleNotification(item, 'single')"> -->
							<img src="@/assets/icons/source/blue-notification.svg" class="w-6 cursor-pointer" alt="" @click="handleNotification(item, 'single')">
							<!-- </div> -->
						</div>
					</div>
				</section>
			</div>
		</div>
		<div v-else class="flex items-center justify-center p-4 py-10 shadow-lg bg-light rounded-lg w-full">
			<div class="flex flex-col gap-2">
				<h3 class="text-xl text-dark font-bold text-center">
					No bus stop or user found
				</h3>
				<p class="text-center max-w-[250px] text-sm text-grey5">
					Try adjusting your search to find what you are looking for
				</p>
			</div>
		</div>

		<button v-if="isScreenLg" class="btn-controls" @click="$emit('next')">
			<Icon name="next2" class="w-7" />
		</button>
	</section>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useTripsModal } from '@/composables/core/modals'
import { useNotifyPassenger } from '@/composables/modules/trips/passengers'
import { isScreenLg } from '@/composables/utils/window'

const { busstopUsersIds } = useNotifyPassenger()

defineEmits(['next', 'prev'])

const props = defineProps({
	routePassengers: {
		type: Array,
		required: true,
		default: () => []
	}
})

const computedGroupByPickup = computed(() => {
	return props.routePassengers.reduce((accumulator:any, currentObject:any) => {
		const pickupKey = currentObject?.pickupRouteBusStop?.id || currentObject?.pickup.location
		const busstopname = currentObject?.pickupRouteBusStop?.name || currentObject?.pickup.location

		if (!accumulator[pickupKey]) {
			accumulator[pickupKey] = { busstopname, passengers: [] }
		}
		accumulator[pickupKey].passengers.push(currentObject)

		return accumulator
	}, {} as Record<string, any>) as any[]
})

const computedGroupByDestination = computed(() => {
	return props.routePassengers.reduce((accumulator:any, currentObject:any) => {
		const destinationKey = currentObject?.destinationRouteBusStop?.id || currentObject?.destination.location
		const busstopname = currentObject?.destinationRouteBusStop?.name || currentObject?.destination.location

		if (!accumulator[destinationKey]) {
			accumulator[destinationKey] = { busstopname, passengers: [] }
		}

		accumulator[destinationKey].passengers.push(currentObject)

		return accumulator
	}, {} as Record<string, any>) as any[]
})

const handleNotification = (item: any, type: string) => {
	busstopUsersIds.value = []
	switch (type) {
		case 'bulk':
			busstopUsersIds.value = item.map((passenger: any) => passenger.user_id)
			break
		case 'single':
			busstopUsersIds.value.push(item.user_id)
			break
		default:
			break
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
const toggleSelection = (val) => {
	selected_all_passengers.value = false
	if (!selectedCheckboxes.value.includes(val?.user_id)) {
		selectedCheckboxes.value.push(val?.user_id)
	} else {
		const index = selectedCheckboxes.value.indexOf(val?.user_id)
		selectedCheckboxes.value.splice(index, 1)
	}
	key.value++
}

const selected_all_passengers = ref(false)
const key = ref(0)

watch(selected_all_passengers, () => {
	if (selected_all_passengers.value) selectedCheckboxes.value = []
})

const filterType = ref('pickup')
const selectedCheckboxes = ref([]) as any
</script>

<style scoped>
.btn-controls{
	@apply bg-white p-2 rounded-full border border-dark shrink-0
}
</style>
