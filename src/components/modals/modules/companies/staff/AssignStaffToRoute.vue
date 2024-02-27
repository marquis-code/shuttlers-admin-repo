<template>
	<Modal
		modal="$atts.modal"
		title="Assign Staff to Route"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="assignStaffToRoute">
			<div class="field relative">
				<div v-if="!loadingMainRoutes" class="field relative w-full">
					<RouteSelector class="w-full" @selected="routeSelected" />
				</div>
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
			<div class="flex justify-between items-center gap-x-10 mt-10">
				<button type="submit" class="bg-gray-600 py-3.5 rounded-md text-xs text-white w-full" @click="useCompaniesModal().closeAssignStaffToRoute()">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary py-3.5 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!processingAssignment" class="text-sm">Assign</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCompaniesModal } from '@/composables/core/modals'
import { useAssignStaffToRoute } from '@/composables/modules/staffs/assignStaffToRoute'
import { useGetMainRoutes } from '@/composables/modules/routes/fetch'
import { useItinerariesByRouteId } from '@/composables/modules/routes/id'
const { getMainRoutesList, loadingMainRoutes, mainRoutesList } = useGetMainRoutes()
const { routeItineraries, loading: loadingItineraries, getRouteItinerariesByRouteId } = useItinerariesByRouteId()
const { populateAssignStaffToRouteForm, assignStaff, assignForm, selectedStaffToAssign, loading: processingAssignment } = useAssignStaffToRoute()
getMainRoutesList()
const form = reactive({
    route_id: '',
    route_itinerary_id: ''
})
const route = useRoute()
const id = String(route.params.id)

watch(() => form.route_id, () => {
	getRouteItinerariesByRouteId(form.route_id)
})

const isButtonEnabled = computed(() => {
	return form.route_itinerary_id && form.route_id
})

const routeSelected = (val: any) => {
	form.route_id = val.id
}

const assignStaffToRoute = () => {
    const itineraryArray = [] as any
    itineraryArray.push(form.route_itinerary_id)
	const payload = {
        itinerary_ids: itineraryArray,
        user_id: selectedStaffToAssign.value.id
    }
	populateAssignStaffToRouteForm(payload)
	assignStaff()
}
</script>
