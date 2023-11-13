<template>
	<Modal
		modal="$atts.modal"
		title="Make Bus Captain"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="makeBusCaptain">
			<div class="field relative">
				<label for="route">Select Route</label>
				<select v-if="!loadingMainRoutes" id="route" v-model="form.route_id" class="border-red-500 text-sm w-full border outline-none py-2.5 rounded-md px-3">
					<option class="" disabled>
						--- select ---
					</option>
					<option v-for="(route, idx) in mainRoutesList" :key="idx" :value="route.id">
						{{ `${route.route_code} - From ${route.pickup} To ${route.destination}` }}
					</option>
				</select>
				<Skeleton v-else height="100px" />
			</div>
			<div v-if="form.route_id" class="field relative">
				<div v-if="!loadingItineraries" class="w-full">
					<label for="itinerary">Assign Itinerary</label>
					<select id="itinerary" v-model="form.route_itinerary_id" class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3">
						<option value="" class="" disabled>
							--- select ---
						</option>
						<option v-for="(itinerary, idx) in routeItineraries" :key="idx" :value="itinerary.id">
							{{ itinerary?.trip_time }}
						</option>
					</select>
				</div>
				<Skeleton v-else height="100px" />
			</div>
			<div v-if="form.route_itinerary_id" class="field relative">
				<div v-if="!loadingItineraryVehicles" class="w-full">
					<label for="vehicle">Select Vehicle</label>
					<select id="vehicle" v-model="form.route_vehicle_id" class="border-red-500 w-full text-sm border outline-none py-2.5 rounded-md px-3">
						<option class="" value="" disabled>
							--- select ---
						</option>
						<option v-for="(itm, idx) in itineraryVehicles" :key="idx" :value="itm.vehicle_id">
							{{ `${itm?.vehicle?.brand} . ${itm?.vehicle?.name} ${itm?.vehicle?.registration_number} . ${itm?.vehicle?.seats} Seater` }} {{ `Driver: ${itm?.driver?.fname} ${itm?.driver?.lname}` }}
						</option>
					</select>
				</div>
				<Skeleton v-else height="100px" />
			</div>
			<div class="flex justify-between items-center gap-x-10 mt-10">
				<button type="submit" class="bg-gray-600 py-3.5 rounded-md text-xs text-white w-full" @click="useUserModal().closeMakeBusCaptain()">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary py-3.5 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!createLoading" class="text-sm">Save Changes</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUserModal } from '@/composables/core/modals'
import { useCreateUsers } from '@/composables/modules/users/create'
import { useGetMainRoutes } from '@/composables/modules/routes/fetch'
import { useItinerariesByRouteId, useGetVehicleByItneraryId } from '@/composables/modules/routes/id'
const { populatePasswordUpdateForm, loading: createLoading, updateUserPassword, populateCreateBusCaptainForm, createBusCaptains } = useCreateUsers()
const { getMainRoutesList, loadingMainRoutes, mainRoutesList } = useGetMainRoutes()
const { routeItineraries, loading: loadingItineraries, getRouteItinerariesByRouteId } = useItinerariesByRouteId()
const { itineraryVehicles, loading: loadingItineraryVehicles, getRouteItineraryVehiclesByItineraryId } = useGetVehicleByItneraryId()
getMainRoutesList()
const form = reactive({
    route_id: '',
    route_itinerary_id: '',
    route_vehicle_id: ''
})
const route = useRoute()
const id = String(route.params.id)

watch(() => form.route_id, () => {
	getRouteItinerariesByRouteId(form.route_id)
})

watch(() => form.route_itinerary_id, () => {
    getRouteItineraryVehiclesByItineraryId(form.route_itinerary_id)
})

const isButtonEnabled = computed(() => {
	return form.route_itinerary_id && form.route_vehicle_id
})

const makeBusCaptain = () => {
	const payload = {
        route_itinerary_id: form.route_itinerary_id,
        route_vehicle_id: form.route_vehicle_id,
        user_id: id
    }
	populateCreateBusCaptainForm(payload)
	createBusCaptains()
}
</script>

<style>

</style>
