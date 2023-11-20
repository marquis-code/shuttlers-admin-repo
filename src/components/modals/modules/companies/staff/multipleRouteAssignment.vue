<template>
	<Modal modal="$atts.modal" title="Assign Staff">
		<form class="flex flex-col gap-4" @submit.prevent="assignStaff">
			<p class="text-sm text-[#313533] font-medium">
				({{ selectedStaffs.length }}) of {{ totalStaffs }} selected
			</p>
			<RuoteSelector @selected="routeSelected" />
			<div v-if="itineraries.length" class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Assign Itinerary</label>
				<select v-model="itinerary_id" required class="input-field">
					<option v-for="n in itineraries" :key="n.id" :value="n.id">
						{{ n.trip_time }}
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Select busstop</label>
				<LocationInput
					id="busStop"
					type="text"
					name="busStop"
					class="input-field"
					placeholder=""
					@change="selectedAddress"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">
					Work days (Selecting multiple days is allowed)
				</label>
				<VueMultiselect v-model="work_days" placeholder="Search..." :searchable="true"
					:options="days" :multiple="true" :taggable="true"
				/>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label class="text-xs text-[#6E717C] font-medium">Work branch</label>
					<select v-model="branch_id" class="input-field">
						<option v-for="n in branches" :key="n.id" :value="n.id">
							{{ n.name }}
						</option>
					</select>
				</div>
				<div class="flex flex-col gap-2">
					<label class="text-xs text-[#6E717C] font-medium">Work shift</label>
					<select v-model="shift_id" class="input-field">
						<option v-for="n in shifts" :key="n.id" :value="n.id">
							{{ n.description }}
						</option>
					</select>
				</div>
			</div>

			<button type="submit" :disabled="assigning" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ assigning ? 'processing...' : 'Assign' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { useCorporateBranches } from '@/composables/modules/corporates/branch'
import { useCorporateWorkShifts } from '@/composables/modules/corporates/shift'
import { useCorporateStaff, useSelectedStaff, useAssignStaff } from '@/composables/modules/corporates/staff/index'

const { totalStaffs } = useCorporateStaff()
const { selectedStaffs } = useSelectedStaff()
const { branches } = useCorporateBranches()
const { shifts } = useCorporateWorkShifts()
const { loading: assigning, assignStaff, route_id, itinerary_id, branch_id, shift_id, work_days, bus_stop, itineraries } = useAssignStaff()

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const selectedAddress = (val: Record<string, any>) => {
	bus_stop.value = val.name
}

const routeSelected = (val: Record<string, any>) => {
	route_id.value = val.id
}

onBeforeUnmount(() => {})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
label{
	margin: 0;
}
</style>
