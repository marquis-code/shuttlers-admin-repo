<template>
	<div class="h-[84vh] overflow-auto">
		<form class="flex flex-col gap-4 p-6 pb-0 items-start" @submit.prevent="isEdit ? update() : create()">
			<div class="flex flex-col gap-4 w-full items-start">
				<LocationInput
					id="startLocation"
					v-model="createRouteForm.start_location.value"
					name="startLocation"
					class="input-field"
					placeholder="Starting point"
				/>
				<div v-for="(n, idx) in createRouteForm.waypoints.value" :key="n" class="field relative mt-6 w-full">
					<label for="stops">Stop {{ idx +1 }} </label>
					<div class="relative input-field p-0 border-none flex">
						<LocationInput
							:id="idx+'stops'"
							autocomplete="off"
							placeholder="Enter location"
							type="text"
							class="input-field"
							required
							@change="updateWaypoint($event, idx)"
						/>
						<Icon name="closed" class="h-[45px] text-dark absolute bg-grey12 border rounded-md right-0 top-0 p-3 cursor-pointer rounded-l-none" @click="createRouteForm.waypoints.value.splice(idx, 1) " />
					</div>
				</div>
				<button
					type="button"
					class="flex items-center gap-x-2 bg-black text-white text-xs rounded-md px-3 py-2 font-medium w-au"
					@click="createRouteForm.waypoints.value.push({id:createRouteForm.waypoints.value.length+1, data: '' })"
				>
					<Icon name="plus" class="w-4 text-white " />	Add Stop
				</button>

				<LocationInput
					id="endLocation"
					v-model="createRouteForm.end_location.value"
					name="endLocation"
					class="input-field"
					placeholder="Destination point"
				/>
			</div>

			<hr>

			<div class="w-full">
				<label>Route Code</label>
				<input v-model="createRouteForm.route_code.value" type="text" placeholder="e.g S300" class="input-field">
			</div>
			<div class="w-full">
				<label class="">Route Description</label>
				<textarea
					v-model="createRouteForm.desc.value"
					placeholder="Route Description (Max . 500 characters)"
					class="input-field"
					rows="6"
					cols="6"
				/>
			</div>

			<div>
				<label>Route Visibility</label>
				<div class="flex items-center gap-x-3">
					<input
						id="public"
						v-model="createRouteForm.visibility.value"
						value="public"
						name="public"
						type="radio"
					>
					<label for="public" class="mt-2">Public</label>
				</div>
				<div class="flex items-center gap-x-3">
					<input
						id="private"
						v-model="createRouteForm.visibility.value"
						value="private"
						name="private"
						type="radio"
					>
					<label for="private" class="mt-2">Private</label>
				</div>
			</div>
			<div class="flex flex-col w-full">
				<label>Route Type</label>
				<div class="flex items-center gap-x-2 w-full">
					<input
						id="shared"
						v-model="createRouteForm.is_exclusive.value"
						value="shared"
						name="shared"
						type="radio"
					>
					<label for="shared" class="mt-2">Shared</label>
				</div>
				<span v-if="createRouteForm.is_exclusive.value === 'shared' && ZeroBookingFlag" class="p-2 bg-grey w-full flex justify-between items-center rounded-lg">
					<span class="text-sm">Allow Zero Booking Shared Trips</span>
					<ToggleButtonSmall v-model="createRouteForm.is_zero_booked_shared_route.value" label="" name="zero_booking" />
				</span>
				<div class="flex items-center gap-x-2 w-full">
					<input
						id="exclusive"
						v-model="createRouteForm.is_exclusive.value"
						value="exclusive"
						name="exclusive"
						type="radio"
					>
					<label for="exclusive" class="mt-2">Exclusive</label>
				</div>
			</div>
			<div v-if="createRouteForm.visibility.value === 'private'">
				<label>Select Corporate that owns this private route</label>
				<InputMultiSelectCompanies v-model="createRouteForm.corporate.value" />
			</div>
			<div>
				<label>Route Availability</label>
				<div class="flex items-center gap-x-2">
					<input
						id="everyday"
						v-model="createRouteForm.route_availability.value"
						value="everyday"
						name="everyday"
						type="radio"
					>
					<label for="everyday" class="mt-2">Everyday</label>
				</div>
				<div class="flex items-center gap-x-2">
					<input
						id="selected_days"
						v-model="createRouteForm.route_availability.value"
						value="selected_days"
						name="selected_days"
						type="radio"
					>
					<label for="selected_days" class="mt-2">Selected days</label>
				</div>
			</div>
			<div v-if="createRouteForm.route_availability.value === 'selected_days'" class="field w-full">
				<label> Select days</label>
				<section class="flex items-center flex-wrap gap-2">
					<button v-for="n in days_of_the_week" :key="n" class="py-1 px-2 border rounded text-sm font-medium" type="button"
						:class="[createRouteForm.route_availability_days.value.includes(n) ? 'border-blue-500 bg-blue-100 text-gray-900' : 'border-gray-200']" @click="handleSelectedDay(n)"
					>
						{{ Capitalize(n).slice(0,3) }}
					</button>
				</section>
			</div>
			<div class="w-full">
				<label for="">Availability Start Date</label>
				<InputDateInput
					id="startDate"
					v-model="createRouteForm.avail_start_date.value"
					class="font-light"
					placeholder="Filter by date"
					:disabled-date="()=>null"
					:clearable="true"
				/>
			</div>
			<div class="w-full">
				<label for="endDate">Availability End Date</label>
				<InputDateInput
					id="endDate"
					v-model="createRouteForm.avail_end_date.value"
					class="font-light"
					placeholder="Filter by date"
					:disabled-date="()=>null"
					:clearable="true"
				/>
			</div>
			<div class="w-full">
				<label>Unavailable Dates</label>
				<div class="flex items-center flex-wrap gap-2 mb-3">
					<div
						v-for="(item, idx) in createRouteForm.unavailable_days.value"
						:key="item"
						class="flex p-2 py-1 items-center gap-2 rounded-lg bg-blue-100 border-blue-700"
					>
						<p class="text-gray-900 text-sm">
							{{ item }}
						</p>
						<span class="cursor-pointer text-rose-500 text-sm font-medium" @click="createRouteForm.unavailable_days.value.splice(idx, 1) ">X</span>
					</div>
				</div>

				<InputDateInput
					id="startDate"
					class="font-light"
					placeholder="Filter by date"
					:clearable="true"
					@update:model-value="($event) => {$event ? createRouteForm.unavailable_days.value.push($event): null}"
				/>
			</div>

			<div v-if="!isEdit" class="space-y-3 w-full">
				<div>
					<label>Time</label>
					<div>
						<InputTimeInput v-model="createRouteForm.itinerary_time.value" />
					</div>
				</div>

				<div>
					<label>Fare</label>
					<input v-model="createRouteForm.fare.value" type="number"
						class="input-field"
					>
				</div>
			</div>

			<div v-if="isEdit" class="flex flex-col gap-4 w-full">
				<div class="flex flex-col">
					<label class="label">Route Owner Type</label>
					<select v-model="createRouteForm.route_owner_type.value" class="input-field">
						<option value="system">
							Shuttlers Owned
						</option>
						<option value="corporate">
							Corporate
						</option>
						<option value="user">
							User
						</option>
					</select>
				</div>
				<div v-if="createRouteForm.route_owner_type.value !== 'system'" class="flex flex-col">
					<label class="label">Select Route Owner</label>
					<InputMultiSelectUsers v-if="createRouteForm.route_owner_type.value === 'user'" v-model="createRouteForm.route_owner.value" />
					<InputMultiSelectCompanies v-else v-model="createRouteForm.route_owner.value" />
				</div>
				<div class="flex flex-col">
					<label class="label">Who is paying for the bookings on this route?</label>
					<select v-model="createRouteForm.payer.value" class="input-field">
						<option value="passenger">
							Passenger
						</option>
						<option value="owner">
							Route Onwer
						</option>
					</select>
				</div>
				<div class="flex flex-col">
					<label class="label">When is booking payment happening?</label>
					<select v-model="createRouteForm.payment_mode.value" class="input-field">
						<option value="pre-trip">
							Before Trip Starts
						</option>
						<option value="post-trip">
							After Trip Ends
						</option>
					</select>
				</div>
			</div>

			<button class="btn-primary w-full" type="submit">
				<span v-if="!loading">{{ isEdit ? 'Update' : 'Create' }} route</span>
				<Spinner v-else />
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useCreateRoute } from '@/composables/modules/routes/create'
import { days_of_the_week } from '@/composables/utils/constant'
import { Capitalize } from '@/composables/utils/formatter'
import { ZeroBookingFlag } from '@/composables/flagging/flags'

const { createRouteForm, loading, create, clearCreateForm, update } = useCreateRoute()

const updateWaypoint = (data, idx) => {
    createRouteForm.waypoints.value[idx].data = data
}

const handleSelectedDay = (n: string) => {
  if (!createRouteForm.route_availability_days.value.includes(n)) {
    createRouteForm.route_availability_days.value.push(n)
  } else {
    const index = createRouteForm.route_availability_days.value.indexOf(n)
    createRouteForm.route_availability_days.value.splice(index, 1)
  }
}

const isEdit = computed(() => {
	return useRoute().fullPath.includes('edit')
})

onBeforeUnmount(() => clearCreateForm())
</script>

<style scoped>
input[type='text']{
	width: 100% !important;
}

</style>
