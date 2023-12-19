<template>
	<main class="flex h-full">
		<section class="w-4/12 bg-white border-r p-6 space-y-6 h-screen overflow-y-auto">
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
						<div v-for="(itm, idx) in form.stopPoints" :key="idx" class="flex items-center w-full h-full rounded-md border">
							<div class="w-full h-full">
								<LocationInput
									:id="itm+'stops'"
									name="addedStopLocation"
									class="input-field"
									placeholder="Enter stop point"
									@change="selectedAdditionalEndPoint"
								/>
							</div>
							<div class="border  h-12">
								<img src="@/assets/icons/source/close.svg" alt="close" class="h-full p-1" @click="removeRow(itm)">
							</div>
						</div>
					</div>
					<button class="flex items-center gap-x-2 bg-black text-white text-xs rounded-md px-3 py-2 font-medium" @click="addStopPoint">
						<img src="@/assets/icons/source/white_plus.svg" class="h-3 w-3" alt="plus">Add Stop
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
			<div>
				<div class="w-full">
					<label class="">Route Code</label>
					<input type="text" placeholder="e.g S300" class="py-3 rounded-md px-3 border w-full outline-none">
				</div>
				<div class="w-full">
					<label class="">Route Description</label>
					<textarea placeholder="Route Description (Max . 500 characters)" class="w-full border outline-none resize-none rounded-md p-4" rows="6" cols="6" />
				</div>
			</div>
			<div>
				<label>Route Visibility</label>
				<div class="flex items-center gap-x-3">
					<input id="public" v-model="selectedRouteVisibility" value="public" name="public" type="radio">
					<label for="public" class="mt-2">Public</label>
				</div>
				<div class="flex items-center gap-x-3">
					<input id="private" v-model="selectedRouteVisibility" value="private" name="private" type="radio">
					<label for="private" class="mt-2">Private</label>
				</div>
			</div>
			<div>
				<label>Route Type</label>
				<div class="flex items-center gap-x-2">
					<input id="shared" v-model="selectedRouteType" value="shared" name="shared" type="radio">
					<label for="shared" class="mt-2">Shared</label>
				</div>
				<div class="flex items-center gap-x-2">
					<input id="exclusive" v-model="selectedRouteType" value="exclusive" name="exclusive" type="radio">
					<label for="exclusive" class="mt-2">Exclusive</label>
				</div>
			</div>
			<div v-if="selectedRouteVisibility === 'private'">
				<label>Select Corporate that owns this private route</label>
				<CorporateSelector v-model="form.corporate" />
			</div>
			<div>
				<label>Route Availability</label>
				<div class="flex items-center gap-x-2">
					<input id="everyday" v-model="selectedRouteAvailability" value="everyday" name="everyday" type="radio">
					<label for="everyday" class="mt-2">Everyday</label>
				</div>
				<div class="flex items-center gap-x-2">
					<input id="selected_days" v-model="selectedRouteAvailability" value="selected_days" name="selected_days" type="radio">
					<label for="selected_days" class="mt-2">Selected days</label>
				</div>
			</div>
			<div>
				<label>Availability Start Date</label>
				<InputDateInput id="startDate" v-model="form.startDate" class="font-light" placeholder="Filter by date" />
			</div>
			<div>
				<label>Availability End Date</label>
				<InputDateInput id="startDate" v-model="form.startDate" class="font-light" placeholder="Filter by date" />
			</div>
			<div>
				<p>Unavailable Dates</p>
				<button class="flex items-center gap-x-2 bg-black text-white text-sm px-3 py-2 rounded-md" @click="addStopPoint">
					<img src="@/assets/icons/source/plus_black.svg" alt="plus">Add Date
				</button>
			</div>
			<div>
				<label>Route Itinerary</label>
				<div> <span>Time</span><input type="number"></div>
				<div> <span>Fare</span><input type="number"></div>
			</div>
			<div>
				<button class="bg-black text-white w-full py-3 rounded-md">
					Create Route
				</button>
			</div>
		</section>
		<section class="w-8/12" />
	</main>
</template>

<script setup lang="ts">
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
	corporate: {}
})

const selectedRouteVisibility = ref('public')
const selectedRouteType = ref('shared')
const selectedRouteAvailability = ref('everyday')

  const addStopPoint = () => {
	if (Object.keys(form.addedStopLocation).length) {
		form.stopPoints.push(form.addedStopLocation)
	}
  }

  const removeRow = (item: string) => {
    form.stopPoints = form.stopPoints.filter((itm) => itm !== item)
  }

  definePageMeta({
    layout: 'dashboard-zero',
    middleware: ['is-authenticated']
})

const selectedStartAddress = (val) => {
	form.startLocation = val.name
	form.start_geo_coordinate = `${val.lat},${val.lng}`
}

const selectedEndAddress = (val) => {
	form.endLocation = val.name
	form.end_geo_coordinate = `${val.lat},${val.lng}`
}

const selectedAdditionalEndPoint = (val) => {
	form.addedStopLocation = val.name
	form.added_stop_geo_cordinate = `${val.lat},${val.lng}`
}
</script>
