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
				<button @click="useTripsModal().openNotifyPassengers()" class="text-sm bg-black text-white px-3 py-2 rounded-md">
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
		<!-- <div v-if="!loading">
			<div v-if="!isEmpty">
				<section v-for="(users, bus_stop, index) in filteredData" :key="index" class="">
					<h6 class="mb-0">
						<div class="bv-example-row" fluid>
							<div align-h="between" align-v="center">
								<div>
									<div class="flex-flex-row align-top">
										<img class="icon" alt="" src="@/assets/icons/source/green-location.svg">
										<div>
											<p class="text-lg" style=" font-size: 1rem; margin-bottom: 2px; margin-top: 5px">
												{{ bus_stop }}
											</p>
											<p style="margin-bottom: 0">
												{{ users.length }} passenger(s)
											</p>
										</div>
									</div>
								</div>
								<div class="text-right">
									<b-button variant="primary" size="sm" @click="toggleNotifyModal(bus_stop, users)">
										Notify Bus-stop
									</b-button>
								</div>
							</div>
						</div>
					</h6>
					<div class="text-dark">
						<div v-for="passenger in users" :key="passenger?.id">
							<div class="flex items-center mb-4">
								<input v-if="shouldShowTransfer" type="checkbox" name="checked_all" :checked="selectedUsers.find(
									(user) => user.id === passenger?.id
								) || selected_all
								" @input="() => {selectUser(passenger); selected_all = false}">
								<b-col>
									<div class="flex gap-3">
										<div class="flex">
											<user-avatar :user="passenger?.user" size="sm" :show-badge="passenger?.is_first_booking" badge-text="New" />
										</div>
										<div>
											<router-link class="sh-page-link" :to="{
												name: 'ShowUser',
												params: { userId: passenger?.user?.id },
											}">
												<p class="mb-0">
													{{
														`${passenger?.user?.fname} ${passenger?.user?.lname}`
													}}
												</p>
											</router-link>
											<span>{{ passenger?.user?.email }}</span> <br>
											<span v-if="passenger?.user?.bus_captain_id">
												<svg-template code="captain" />
												<span class="captain-text ml-1">Bus Captain</span>
											</span>
										</div>
									</div>
								</b-col>
								<b-col class="text-center">
									<route-description :pickup="passenger?.pickup?.location" :destination="passenger?.destination?.location" />
								</b-col>
								<b-col class="text-center">
									{{
										passenger?.user?.phone
									}}
								</b-col>
								<b-col>
									{{
										useDateFormat(passenger?.created_at, 'YYYY-MM-DD').value
									}}
								</b-col>
								<b-col class="text-center">
									<span class="sh-badge" :class="passenger?.check_in_meta?.dropOffClass">
										{{ passenger?.check_in_status }}
									</span>
								</b-col>
								<b-col class="text-center">
									<img style="cursor: pointer" alt="" class="icon" src="@/assets/icons/source/blue-notification.svg" @click="toggleUserNotifyModal(passenger)">
								</b-col>
							</div>
						</div>
					</div>
				</section>
			</div>

			<div v-else class="bg-white pb-14 shadow-sm border-[0.4px] rounded-md p-3 w-full flex items-center justify-center flex-col space-y-1 ">
				<img src="@/assets/icons/source/empty-search-state.svg" alt="enpty state">
				<p class="font-medium text-gray-900">
					No bus stop or user found
				</p>
				<p class="font-light text-gray-600">
					Try adjusting your search to find what you are looking for
				</p>
			</div>
		</div> -->
	</section>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
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
const selected_busstop = ref('')
      const busstop_passengers = ref([])
      const busstop_passenger = ref({})
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

const selectedUsers = ref([])

const seeDropoffs = () => {
	filterType.value = 'dropoff'
}

const seePickups = () => {
	filterType.value = 'pickup'
}
const search = ref('')
const manifestToShow = ref({})
const filteredData = computed(() => {
      if (!search.value) {
        return manifestToShow.value
      } else {
        const newObj = {}
        for (const busStop in manifestToShow.value) {
          const busStopPassenger = manifestToShow.value[busStop]
          for (let index = 0; index < busStopPassenger.length; index++) {
            const passenger = busStopPassenger[index]
            const firstName = passenger.user.fname.toLowerCase()
            const lastName = passenger.user.lname.toLowerCase()
            const email = passenger.user.email.toLowerCase()
            const fullName = firstName + ' ' + lastName
            if (firstName.includes(search.value.toLowerCase()) | lastName.includes(search.value.toLowerCase()) | email.includes(search.value.toLowerCase()) | fullName.includes(search.value.toLowerCase()) | busStop.toLowerCase().includes(search.value.toLowerCase())) {
              newObj[busStop] = newObj[busStop] ?? []
              newObj[busStop].push(passenger)
            }
          }
        }
        return newObj
      }
    })

	const selectUser = (selectedUser) => {
      const index = selectedUsers.value.findIndex(
        (user) => user.id === selectedUser.id
      )
      if (index !== -1) {
         selectedUsers.splice(index, 1)
      } else {
        selectedUser.new_pickup = null
        selectedUser.new_dropoff = null
        selectedUsers.value.push(selectedUser)
      }
    }

    const toggleNotifyModal = (busStop, users) => {
      selected_busstop.value = busStop
      busstop_passengers.value = users
    //   this.$bvModal.show(this.busstopModalId)
    }

	const isEmpty = computed(() => {
      return Object.keys(JSON.parse(JSON.stringify(filteredData.value)))
        .length === 0
    })

	const shouldShowTransfer = computed(() => {
      return true
    })
	const loading = ref(false)
</script>

<style scoped>

</style>
