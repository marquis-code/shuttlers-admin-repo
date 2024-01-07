<template>
	<div class="">
		<div class="flex">
			<div
				class="w-4/12 bg-white border-r p-6 space-y-6 sticky top-4 h-[1000px] overflow-y-auto"
			>
				<h1 class="text-lg font-semibold text-gray-900 py-0">
					New Route
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
						@click="toggleDatePicker"
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
					class="flex items-center flex-wrap gap-x-3"
				>
					<div v-for="itm in daysOfWeek" :key="itm.id">
						<input
							:id="itm.short"
							type="checkbox"
							:name="itm.short"
							:value="itm.value"
							class="peer hidden"
							:checked="itm.selected"
							@change="handleRouteAvailabilityDay($event)"
						>

						<label
							:for="itm.short"
							class="flex cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-100 peer-checked:text-gray-900"
						>
							<p class="text-sm font-medium">{{ itm.short }}</p>
						</label>
					</div>
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
					<button type="button" class="bg-black text-white w-full py-3 rounded-md" @click="createRoute">
						<span v-if="!loading">Create route</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
			<div class="w-8/12">
				<GMapMap map-type-id="terrain" class="h-full"
					:options="{
						zoomControl: true,
						mapTypeControl: false,
						scaleControl: true,
						streetViewControl: false,
						rotateControl: false,
						fullscreenControl: false
					}"
					:center="center" :zoom="8"
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
import { useCreateRoute } from '@/composables/modules/routes/createRoute'
import { useAlert } from '@/composables/core/notification'

const { loading, startLocation, endLocation, pickup, destination, otherStops, desc, route_code, visibility, is_exclusive, corporate, route_availability, avail_end_date, avail_start_date, unavailable_days, route_availability_days, itinerary_time, fare, createRoute, polyLine, clearObj } = useCreateRoute()

const otherStopNumber = ref(0)
const center = computed(() => {
	if (polyLine.value.length) return polyLine.value[(Math.floor(polyLine.value.length / 2))]
	if (startLocation.value?.lat && endLocation.value?.lat) {
		return { lat: startLocation.value.lat, lng: startLocation.value.lng }
	} else {
		return { lat: 51.093048, lng: 6.84212 }
	}
})
const showDatePicker = ref(false)
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
}

const addStopPoint = () => {
	otherStopNumber.value++
//   if (Object.keys(form.startLocation).length > 0) {
//     form.stopPoints.push(form.addedStopLocation.name)
//   } else {
//     useAlert().openAlert({
//       type: 'ERROR',
//       msg: 'You need to add a start point before adding a stop point.'
//     })
//   }
}

const selectedStartAddress = (val) => {
  startLocation.value = val
  pickup.value = val?.name
}

const selectedEndAddress = (val) => {
	endLocation.value = val
	destination.value = val?.name
}

const selectedAdditionalEndPoint = (val) => {
	otherStops.value.push(val)
}

const handleRouteAvailabilityDay = ($event: any) => {
  route_availability_days.value.push($event.target.value)
  if (route_availability_days.value.length === 7) {
    route_availability.value = 'everyday'
  }
}

const handleUnavailableDate = (val: string) => {
  if (!unavailable_days.value.includes(val)) {
    unavailable_days.value.push(val)
    showDatePicker.value = !showDatePicker.value
  } else {
    useAlert().openAlert({
      type: 'ERROR',
      msg: `${val} has already been added.`
    })
  }
}

const removeUnavailableDay = (val: string) => {
	const index = unavailable_days.value.indexOf(val)
	unavailable_days.value.splice(index, 1)
}

const daysOfWeek = reactive([
  { id: 1, value: 'sunday', short: 'Sun', selected: false },
  { id: 2, value: 'monday', short: 'Mon', selected: false },
  { id: 3, value: 'tuesday', short: 'Tue', selected: false },
  { id: 4, value: 'wednesday', short: 'Wed', selected: false },
  { id: 5, value: 'thursday', short: 'Thu', selected: false },
  { id: 6, value: 'friday', short: 'Fri', selected: false },
  { id: 7, value: 'saturday', short: 'Sat', selected: false }
])

definePageMeta({
  layout: 'dashboard-zero',
  middleware: ['is-authenticated']
})

clearObj()
</script>
