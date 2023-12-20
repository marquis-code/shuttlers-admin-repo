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
						<div v-if="form.stopPoints.length" class="space-y-3">
							<div
								v-for="(itm, idx) in form.stopPoints"
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
										@click="removeRow(itm)"
									>
								</div>
							</div>
						</div>
						<button
							class="flex items-center gap-x-2 bg-black text-white text-xs rounded-md px-3 py-2 font-medium"
							@click="addStopPoint"
						>
							<img
								src="@/assets/icons/source/white_plus.svg"
								class="h-3 w-3"
								alt="plus"
							>Add Stop
						</button>
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
							v-model="createForm.route_code.value"
							type="text"
							placeholder="e.g S300"
							class="py-3 rounded-md px-3 border w-full outline-none"
						>
					</div>
					<div class="w-full">
						<label class="">Route Description</label>
						<textarea
							v-model="createForm.info.description.value"
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
							v-model="createForm.visibility.value"
							value="public"
							name="public"
							type="radio"
						>
						<label for="public" class="mt-2">Public</label>
					</div>
					<div class="flex items-center gap-x-3">
						<input
							id="private"
							v-model="createForm.visibility.value"
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
							v-model="createForm.is_exclusive.value"
							value="shared"
							name="shared"
							type="radio"
						>
						<label for="shared" class="mt-2">Shared</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input
							id="exclusive"
							v-model="createForm.is_exclusive.value"
							value="exclusive"
							name="exclusive"
							type="radio"
						>
						<label for="exclusive" class="mt-2">Exclusive</label>
					</div>
				</div>
				<div v-if="selectedRouteVisibility === 'private'">
					<label>Select Corporate that owns this private route</label>
					<CorporateSelector v-model="createForm.corporate_id.value" />
				</div>
				<div>
					<label>Route Availability</label>
					<div class="flex items-center gap-x-2">
						<input
							id="everyday"
							v-model="selectedRouteAvailability"
							value="everyday"
							name="everyday"
							type="radio"
						>
						<label for="everyday" class="mt-2">Everyday</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input
							id="selected_days"
							v-model="selectedRouteAvailability"
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
						v-model="createForm.route_availability_start_date.value"
						class="font-light"
						placeholder="Filter by date"
					/>
				</div>
				<div>
					<label>Availability End Date</label>
					<InputDateInput
						id="startDate"
						v-model="createForm.route_availability_end_date.value"
						class="font-light"
						placeholder="Filter by date"
					/>
				</div>
				<div class="space-y-3">
					<p class="font-medium">
						Unavailable Dates
					</p>
					<div class="flex items-center flex-wrap gap-x-3">
						<div
							v-for="item in form.selected_dates"
							:key="item"
							class="flex px-3 py-2 items-center gap-x-2 rounded-lg bg-blue-100 border-blue-700"
						>
							<p class="text-gray-900 text-sm">
								{{ item }}
							</p>
							<span
								class="cursor-pointer text-rose-500 font-medium"
								@click="removeSelected(item)"
							>X</span
							>
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
							v-model="form.selected_date"
							class="font-light"
							placeholder="Filter by date"
							@update:model-value="handleSelectedDate"
						/>
					</div>
				</div>
				<div
					v-if="selectedRouteAvailability === 'selected_days'"
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
							@change="handleSelectedDay($event)"
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
							<div><InputTimeInput v-model="createForm.itineraries[0].time.value" /></div>
						</div>
					</div>
					<div>
						<div>
							<label>Fare</label>
							<div>
								<input
									v-model="createForm.itineraries[0].fare.value"
									class="border w-full py-3 outline-none rounded-md input-field px-3"
									type="number"
								>
							</div>
						</div>
					</div>
				</div>
				<div>
					<button class="bg-black text-white w-full py-3 rounded-md">
						<span v-if="!loading">Create route</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
			<div class="w-8/12">
				<MapDisplay
					:start-point="form.startLocation"
					:end-point="form.endLocation"
					:stops="form.stopPoints"
					:props-loading="loading"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCreateRoute } from '@/composables/modules/routes/createRoute'
import { useAlert } from '@/composables/core/notification'
const { loading, createForm, createRoute } = useCreateRoute()
const form = reactive({
  stopPoints: [],
  startLocation: {},
  addedStopLocation: {} as any,
  added_stop_geo_cordinate: '',
  start_geo_coordinate: '',
  endLocation: {},
  end_geo_coordinate: '',
  startDate: '',
  endDate: '',
  corporate: {},
  itineraryTime: '',
  route_availability_days: [],
  selected_date: '',
  selected_dates: []
})
const showDatePicker = ref(false)
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
}
const routeAvailability = ref(true)

const selectedRouteVisibility = ref('public')
const selectedRouteType = ref('shared')
const selectedRouteAvailability = ref('everyday')

const addStopPoint = () => {
  if (Object.keys(form.startLocation).length > 0) {
    form.stopPoints.push(form.addedStopLocation.name)
  } else {
    useAlert().openAlert({
      type: 'ERROR',
      msg: 'You need to add a start point before adding a stop point.'
    })
  }
}

if (selectedRouteVisibility.value === 'everyday') {
  createForm.day_of_week.value = 'MON-FRI'
}

const removeRow = (item: string) => {
  form.stopPoints = form.stopPoints.filter((itm) => itm !== item)
}

definePageMeta({
  layout: 'dashboard-zero',
  middleware: ['is-authenticated']
})

const selectedStartAddress = (val) => {
  form.startLocation = val
  createForm.pickup.value = val.name
  createForm.start_location.value = {
    lat: val.lat,
    lng: val.lng
  }
}

const selectedEndAddress = (val) => {
  form.endLocation = val
  createForm.destination.value = val.name
  createForm.end_location.value = {
    lat: val.lat,
    lng: val.lng
  }
}

const selectedAdditionalEndPoint = (val) => {
  form.stopPoints.push(val.name)
  form.addedStopLocation = val
  form.added_stop_geo_cordinate = `${val.lat},${val.lng}`
}

const handleSelectedDay = ($event: any) => {
  createForm.route_availability_days.value.push($event.target.value)
  if (createForm.route_availability_days.value.length === 7) {
    selectedRouteAvailability.value = 'everyday'
  }
}

const handleSelectedDate = (val: string) => {
  if (!form.selected_dates.includes(val)) {
    form.selected_dates.push(val)
    showDatePicker.value = !showDatePicker.value
    form.selected_date = ''
  } else {
    useAlert().openAlert({
      type: 'ERROR',
      msg: `${val} has already been added.`
    })
  }
}

// createForm.itineraries.value.push(
// 	{
// 	id: 1,
// 	time: '',
// 	fare: ''
// }
// )

const daysOfWeek = reactive([
  { id: 1, value: 'sunday', short: 'Sun', selected: false },
  { id: 2, value: 'monday', short: 'Mon', selected: false },
  { id: 3, value: 'tuesday', short: 'Tue', selected: false },
  { id: 4, value: 'wednesday', short: 'Wed', selected: false },
  { id: 5, value: 'thursday', short: 'Thu', selected: false },
  { id: 6, value: 'friday', short: 'Fri', selected: false },
  { id: 7, value: 'saturday', short: 'Sat', selected: false }
])

const removeSelected = (itm: string) => {
  form.selected_dates = form.selected_dates.filter((d) => d !== itm)
}
</script>
