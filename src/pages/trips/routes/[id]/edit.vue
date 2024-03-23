<template>
	<div class="">
		<ButtonGoBack url="/trips/routes" class="mb-6 ml-9" />
		<div v-if="loading_details" class="p-4">
			<Skeleton height="400px" />
		</div>
		<div v-else class="flex h-[calc(100vh-110px)]">
			<div
				class="w-4/12 bg-white border-r p-6 space-y-6 sticky top-4 h-full overflow-y-auto"
			>
				<div class="flex flex-col gap-2">
					<h1 class="text-lg font-semibold text-gray-900 py-0">
						Edit Route
					</h1>
				</div>
				<div class="space-y-3">
					<div class="space-y-3">
						<div>
							<LocationInput
								id="startLocation"
								v-model="pickup"
								name="startLocation"
								class="input-field"
								placeholder="Starting point"
								@change="selectedStartAddress"
							/>
						</div>
					</div>
					<div>
						<LocationInput
							id="endLocation"
							v-model="destination"
							name="endLocation"
							class="input-field"
							placeholder="Destination point"
							@change="selectedEndAddress"
						/>
					</div>
				</div>
				<hr>
				<div class="space-y-3">
					<div class="w-full">
						<label class="">Route Code</label>
						<input
							v-model="route_code"
							type="text"
							placeholder="e.g S300"
							class="py-3 rounded-md px-3 border w-full outline-none"
						>
					</div>
					<div class="w-full">
						<label class="">Route Description</label>
						<textarea
							v-model="desc"
							placeholder="Route Description (Max . 500 characters)"
							class="w-full border outline-none resize-none rounded-md p-4"
							rows="6"
							cols="6"
						/>
					</div>
				</div>
				<div>
					<label>Route Visibility</label>
					<div class="flex items-center gap-x-3">
						<input
							id="public"
							v-model="visibility"
							value="public"
							name="public"
							type="radio"
						>
						<label for="public" class="mt-2">Public</label>
					</div>
					<div class="flex items-center gap-x-3">
						<input
							id="private"
							v-model="visibility"
							value="private"
							name="private"
							type="radio"
						>
						<label for="private" class="mt-2">Private</label>
					</div>
				</div>
				<div>
					<label>Route Status</label>
					<div class="flex items-center gap-x-2">
						<input
							id="active"
							v-model="status"
							value="active"
							name="active"
							type="radio"
						>
						<label for="active" class="mt-2">Active</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input
							id="inactive"
							v-model="status"
							value="inactive"
							name="inactive"
							type="radio"
						>
						<label for="inactive" class="mt-2">Inactive</label>
					</div>
				</div>
				<div>
					<label>Route Type</label>
					<div class="flex items-center gap-x-2">
						<input
							id="shared"
							v-model="is_exclusive"
							value="shared"
							name="shared"
							type="radio"
						>
						<label for="shared" class="mt-2">Shared</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input
							id="exclusive"
							v-model="is_exclusive"
							value="exclusive"
							name="exclusive"
							type="radio"
						>
						<label for="exclusive" class="mt-2">Exclusive</label>
					</div>
				</div>
				<div v-if="visibility === 'private'">
					<label>Select Corporate that owns this private route</label>
					<InputMultiSelectCompanies v-model="corporate" />
				</div>
				<div>
					<label>Route Availability</label>
					<div class="flex items-center gap-x-2">
						<input
							id="everyday"
							v-model="route_availability"
							value="everyday"
							name="everyday"
							type="radio"
						>
						<label for="everyday" class="mt-2">Everyday</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input
							id="selected_days"
							v-model="route_availability"
							value="selected_days"
							name="selected_days"
							type="radio"
						>
						<label for="selected_days" class="mt-2">Selected days</label>
					</div>
				</div>
				<div>
					<label>Availability Start Date</label>
					<InputDateInput
						id="startDate"
						v-model="avail_start_date"
						:clearable="true"
						class="font-light"
						placeholder="Filter by date"
					/>
				</div>
				<div>
					<label>Availability End Date</label>
					<InputDateInput
						id="startDate"
						v-model="avail_end_date"
						class="font-light"
						placeholder="Filter by date"
					/>
				</div>
				<div class="space-y-3">
					<p class="font-medium">
						Unavailable Dates
					</p>
					<div class="flex items-center flex-wrap gap-2">
						<div
							v-for="item in unavailable_days"
							:key="item"
							class="flex p-2 py-1 items-center gap-2 rounded-lg bg-blue-100 border-blue-700"
						>
							<p class="text-gray-900 text-sm">
								{{ item }}
							</p>
							<span class="cursor-pointer text-rose-500 text-sm font-medium" @click="removeUnavailableDay(item)">X</span>
						</div>
					</div>
					<button
						class="flex items-center gap-x-2 bg-black text-white text-sm px-3 py-2 rounded-md"
						@click="showDatePicker = !showDatePicker"
					>
						<img src="@/assets/icons/source/white-plus.svg" alt="plus">Add
						Date
					</button>
					<div v-if="showDatePicker">
						<InputDateInput
							id="startDate"
							class="font-light"
							placeholder="Filter by date"
							@update:model-value="handleUnavailableDate"
						/>
					</div>
				</div>
				<div
					v-if="route_availability === 'selected_days'"
					class="flex items-center flex-wrap gap-2"
				>
					<button v-for="n in all_days" :key="n" class="py-1 px-2 border rounded text-sm font-medium"
						:class="[route_availability_days.includes(n) ? 'border-blue-500 bg-blue-100 text-gray-900' : 'border-gray-200']" @click="handleSelectedDay(n)"
					>
						{{ Capitalize(n).slice(0,3) }}
					</button>
				</div>
				<div class="flex flex-col">
					<label>Route Owner Type</label>
					<select v-model="route_owner_type" class="p-2 border rounded-md bg-transparent" @change="who_pays = '';route_owner = {}">
						<option value="corporate">
							Corporate
						</option>
						<option value="user">
							User
						</option>
						<option value="system">
							Shuttlers Owned
						</option>
					</select>
				</div>
				<div v-if="route_owner_type === 'user' || route_owner_type === 'corporate'" class="flex flex-col">
					<label>Select Route Owner</label>
					<InputMultiSelectCompanies v-if="route_owner_type === 'corporate'" v-model="route_owner" />
					<InputMultiSelectUsers v-if="route_owner_type === 'user'" v-model="route_owner" />
				</div>
				<div class="flex flex-col">
					<label>Who is paying for the bookings on this route?</label>
					<select v-model="who_pays" class="p-2 border rounded-md bg-transparent">
						<option value="passenger">
							Passenger
						</option>
						<option v-if="route_owner_type == 'corporate' || route_owner_type == 'user'" value="owner">
							Route Owner
						</option>
					</select>
				</div>
				<div class="flex flex-col">
					<label>When is booking payment happening?</label>
					<select v-model="payment_mode" class="p-2 border rounded-md bg-transparent">
						<option value="pre-trip">
							Before Trip Starts
						</option>
						<option value="post-trip">
							After Trip Ends
						</option>
					</select>
				</div>

				<div>
					<button type="button" class="bg-black text-white w-full py-3 rounded-md flex items-center justify-center" @click="updateRoute">
						<span v-if="!loading">Update route</span>
						<Spinner v-else />
					</button>
				</div>
			</div>

			<!-- <div v-if="startLocation?.lat && endLocation?.lat" class="w-8/12">
				<GMapMap map-type-id="terrain" class="h-screen"
					:options="{
						zoomControl: true,
						mapTypeControl: false,
						scaleControl: true,
						streetViewControl: false,
						rotateControl: false,
						fullscreenControl: false
					}"
					:center="center" :zoom="12"
				>
					<GMapPolyline v-if="polyLine" ref="polyline" :path="polyLine" />
					<template v-if="startLocation?.lat && endLocation?.lat">
						<GMapMarker v-for="(n, index) in [startLocation, endLocation]" :key="index"
							:position="{
								lat: n.lat,
								lng: n.lng
							}"
						/>
					</template>
				</GMapMap>
			</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { _useCreateRoute } from '@/composables/modules/routes/createRoute'
import { useUpdateRoute } from '@/composables/modules/routes/update'
import { useGetRouteDetailsToPrefillFields } from '@/composables/modules/routes/getRouteDetailsToPrefillFields'
import { Capitalize } from '@/composables/utils/formatter'

const { loading, startLocation, endLocation, showDatePicker, desc, route_code, visibility, is_exclusive, corporate, route_availability, avail_end_date, avail_start_date, unavailable_days, route_availability_days, polyLine, all_days, center, selectedStartAddress, selectedEndAddress, handleSelectedDay, handleUnavailableDate, removeUnavailableDay, status, route_owner_type, route_owner, who_pays, payment_mode, pickup, destination } = _useCreateRoute()
const { updateRoute } = useUpdateRoute()
const { getRouteDetailsToPrefillFields, loading_details } = useGetRouteDetailsToPrefillFields()

const id = useRoute().params.id as string
getRouteDetailsToPrefillFields(id)

definePageMeta({
  layout: 'dashboard-zero',
  middleware: ['is-authenticated']
})

</script>src/composables/modules/routes/create
