<template>
	<main>
		<Modal :is-large-modal="true" modal="$atts.modal" title="Add passenger to trip" :no-close-btn="true"
			class="text-center w-0">
			<Table v-if="addPassengerSteps == 0" :checkbox="true" :loading="loading" :headers="tableFields"
				:table-data="usersList" :has-options="true" @checked="handleCheckedItems">
				<template #header>
					<TableFilter :filter-type="{ showSearchBar: true }" :checkbox="true" @filter="onFilterUpdate" />
				</template>
				<template #item="{ item }">
					<div v-if="item.id">
						<Avatar :name="item?.data?.lname" bg="#B1C2D9" />
					</div>
					<div v-if="item.fname" class="">
						<NuxtLink :to="`/users/${item.data.id}/user-info`"
							class="flex flex-col gap-y-2 py-3 text-blue-600 hover:text-gray-600 text-base">
							<p>{{ item?.data?.fname }}</p>
						</NuxtLink>
					</div>
					<div v-if="item.lname" class="">
						<NuxtLink :to="`/users/${item.data.id}/user-info`"
							class="flex flex-col gap-y-2 py-3 text-blue-600 hover:text-gray-600 text-base">
							{{ item?.data?.lname }}
						</NuxtLink>
					</div>
					<div v-if="item.email" class="">
						<NuxtLink :to="`/users/${item.data.id}/user-info`"
							class="flex flex-col gap-y-2 py-3 text-blue-600 hover:text-gray-600 text-base">
							{{ item?.data?.email }}
						</NuxtLink>
					</div>
					<div v-if="item.phone" class="">
						<NuxtLink :to="`/users/${item.data.id}/user-info`"
							class="flex flex-col gap-y-2 py-3 text-blue-600 hover:text-gray-600 text-base">
							{{ item?.data?.phone }}
						</NuxtLink>
					</div>
					<div v-if="item.date_joined" class="space-y-4 text-base">
						{{ moment.utc(item?.data?.created_at).format('ll') }}
					</div>
				</template>
				<template #footer>
					<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)"
						@next="next" @prev="prev" />
				</template>
			</Table>
			<Table v-if="addPassengerSteps == 1" :headers="confirmationTableFields" :table-data="computedTableData"
				:has-options="true">
				<template #item="{ item }">
					<div v-if="item.avatar">
						<Avatar :name="item?.data?.avatar" bg="#B1C2D9" />
					</div>
					<div v-if="item.user" class="cursor-pointer" @click="onRowClicked(item.data)">
						<span>{{ item?.data?.fname }} {{ item?.data?.lname }}</span><br>
						<span>{{ item?.data?.phone }} {{ item?.data?.email }}</span>
					</div>
					<div v-if="item.pickup" class="">
						<select v-model="item.data.pickup_route_bus_stop_id" class="input-field">
							<option disabled value="">
								Select Pickup
							</option>
							<option v-for="itm in pickupLocations" :key="itm.id" :value="itm.id">
								{{ itm.name }}
							</option>
						</select>
					</div>
					<div v-if="item.dropoff" class="">
						<select v-model="item.data.destination_route_bus_stop_id" class="input-field w-full">
							<option disabled value="">
								Select Drop-off
							</option>
							<option v-for="itm in dropoffLocations" :key="itm.id" :value="itm.id">
								{{ itm.name }}
							</option>
						</select>
					</div>
					<div v-if="item.action" class="">
						<button class="text-sm bg-black text-white rounded-md px-3 py-2.5" @click="removeUser(item.data)">
							Remove
						</button>
					</div>
				</template>
			</Table>
			<div class="flex justify-end gap-x-6 items-end mr-4 mt-4">
				<div>
					<div type="button" class="bg-black text-white py-2.5 px-3 rounded-md text-sm cursor-pointer"
						@click="useTripsModal().closeAddPassengersToTrips()">
						Cancel
					</div>
				</div>
				<div>
					<div v-if="addPassengerSteps == 0" class="bg-black text-white py-2.5 px-3 rounded-md text-sm cursor-pointer"
						@click="addPassengerSteps += 1">
						Add {{ selectedUsers.length ? `${selectedUsers.length} selected ${selectedUsers.length > 1 ? 'users'
							: 'user'}` : '' }}
					</div>
					<button v-else :disabled="processing" :class="[processing ? 'opacity-25 cursor-not-allowed' : null]" class="font-[700] w-full py-2.5 text-white flex justify-center items-center rounded-md bg-[#000005] px-3 text-sm" @click="proceedToAddPassengers">
						<span v-if="!processing" class="flex justify-center items-center gap-2.5">Proceed</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
		</Modal>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useRouteBusstopsByRouteId } from '@/composables/modules/routes/id'
import { useTripsModal } from '@/composables/core/modals'
import { useAddPassengers } from '@/composables/modules/trips/addPassengers'
import { useGetUsersList } from '@/composables/modules/users/fetch'
import { useUserIdDetails } from '@/composables/modules/users/id'
import { useCompletedTripIdDetails } from '@/composables/modules/trips/id'
const { getRouteBustopsById, busstops } = useRouteBusstopsByRouteId()
const { addPassengers, setPassengersList, loading: processing } = useAddPassengers()
const { selectedTrip } = useCompletedTripIdDetails()
const { getUsersList, loading, usersList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetUsersList()
getUsersList()
const route_id = String(selectedTrip.value.route_id)
getRouteBustopsById(route_id)
const selectedUsers = ref([]) as any
const onRowClicked = (data) => {
	const { selectedUser } = useUserIdDetails()
	useRouter().push(`/users/${data.id}/user-info`)
	selectedUser.value = data
}

const addPassengerSteps = ref(0)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const tableFields = ref([
	{
		text: 'AVATAR',
		value: 'id'
	},
	{
		text: 'FIRST NAME',
		value: 'fname'
	},
	{
		text: 'LAST NAME',
		value: 'lname'
	},
	{
		text: 'EMAIL',
		value: 'email'
	},
	{
		text: 'PHONE',
		value: 'phone'
	},
	{
		text: 'DATE JOINED',
		value: 'date_joined'
	}
])

const confirmationTableFields = ref([
	{
		text: 'AVATAR',
		value: 'avatar'
	},
	{
		text: 'USER',
		value: 'user'
	},
	{
		text: 'PICKUP BUS STOP',
		value: 'pickup'
	},
	{
		text: 'DROPOFF BUS STOP',
		value: 'dropoff'
	},
	{
		text: 'ACTION',
		value: 'action'
	}
])

const computedTableData = computed(() =>
selectedUsers.value.map((i) => {
         return {
             ...i,
             avatar: `${i?.fname}`,
             pickup: '',
             dropoff: '',
			 pickup_route_bus_stop_id: '',
			 destination_route_bus_stop_id: '',
			 action: ''
         }
    })
)

if (computedTableData.value) {
	computedTableData.value.forEach((location, index) => {
		watch(() => location.pickup_route_bus_stop_id, (newValue) => {
			computedTableData.value[index].pickup_route_bus_stop_id = newValue ?? ''
		})
		watch(() => location.destination_route_bus_stop_id, (newValue) => {
			computedTableData.value[index].destination_route_bus_stop_id = newValue ?? ''
		})
	})
}

const handleCheckedItems = (val) => {
	selectedUsers.value = val
}

const removeUser = (itm) => {
	const index = selectedUsers.value.findIndex((item) => item.id === itm.id)
	if (index !== -1) {
		selectedUsers.value.splice(index, 1)
	}
}

const pickupLocations = computed(() => {
	return busstops.value.filter((stop) => stop.is_pickup)
})

const dropoffLocations = computed(() => {
	return busstops.value.filter((stop) => stop.is_dropoff)
})

const proceedToAddPassengers = () => {
	const result = computedTableData.value.map((user) => {
		return {
			user_id: user.id,
			pickup_route_bus_stop_id: user.pickup_route_bus_stop_id,
			destination_route_bus_stop_id: user.destination_route_bus_stop_id
		}
	})
	setPassengersList(result)
	addPassengers().then(() => {
		useTripsModal().closeAddPassengersToTrips()
	})
}
</script>
