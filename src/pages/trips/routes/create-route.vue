<template>
	<div class="">
		<div class="flex h-[calc(100vh-90px)]">
			<div
				class="w-4/12 bg-white border-r p-6 space-y-6 sticky top-4 h-full overflow-y-auto"
			>
				<h1 class="text-lg font-semibold text-gray-900 py-0">
					New Route
					<!-- {{ longitude }} {{ latitude }} {{ locationError }} -->
				</h1>
				<div class="space-y-3">
					<div class="space-y-3">
						<div>
							<LocationInput
								id="startLocation"
								name="startLocation"
								class="input-field"
								placeholder="Starting point"
								@change="selectedStartAddress"
							/>
						</div>
						<!-- <div v-if="otherStopNumber" class="space-y-3">
							<div
								v-for="(itm, idx) in otherStopNumber"
								:key="idx"
								class="flex items-center w-full h-full rounded-md border"
							>
								<div class="w-full h-full">
									<LocationInput
										:id="itm + 'stops'"
										name="addedStopLocation"
										class="input-field"
										placeholder="Enter stop point"
										@change="selectedAdditionalEndPoint"
									/>
								</div>
								<div class="border h-12">
									<img
										src="@/assets/icons/source/close.svg"
										alt="close"
										class="h-full p-1"
									>
								</div>
							</div>
						</div> -->
						<!-- <button
							class="flex items-center gap-x-2 bg-black text-white text-xs rounded-md px-3 py-2 font-medium"
							@click="addStopPoint"
						>
							<img
								src="@/assets/icons/source/white_plus.svg"
								class="h-3 w-3"
								alt="plus"
							>Add Stop
						</button> -->
					</div>
					<div>
						<LocationInput
							id="endLocation"
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
				<div class="space-y-3">
					<div>
						<label>Route Itinerary</label>
						<div>
							<label>Time</label>
							<div>
								<InputTimeInput v-model="itinerary_time" />
							</div>
						</div>
					</div>
					<div>
						<div>
							<label>Fare</label>
							<input v-model="fare" type="number"
								class="border w-full py-3 outline-none rounded-md input-field px-3"
							>
						</div>
					</div>
				</div>
				<div>
					<button type="button" class="bg-black text-white w-full py-3 rounded-md flex items-center justify-center" @click="createRoute">
						<span v-if="!loading">Create route</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
			<div class="w-8/12">
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
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGeolocationApi } from '@/composables/core/useGeoLocation'
import { useCreateRoute } from '@/composables/modules/routes/createRoute'
import { Capitalize } from '@/composables/utils/formatter'
// const { latitude, longitude, locationError } = useGeolocationApi()
const { loading, startLocation, endLocation, showDatePicker, desc, route_code, visibility, is_exclusive, corporate, route_availability, avail_end_date, avail_start_date, unavailable_days, route_availability_days, itinerary_time, fare, createRoute, polyLine, clearObj, all_days, center, selectedStartAddress, selectedEndAddress, handleSelectedDay, handleUnavailableDate, removeUnavailableDay } = useCreateRoute()

definePageMeta({
  layout: 'dashboard-zero',
  middleware: ['is-authenticated']
})

clearObj()
</script>
