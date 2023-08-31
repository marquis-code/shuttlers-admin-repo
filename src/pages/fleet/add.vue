<template>
	<main>
		<div class="mb-6">
			<button class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2" @click="$router.go(-1)">
				Go back
			</button>
		</div>
		<div class="bg-white rounded-md border w-8/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Add a New Vehicle
				</p>
			</div>
			<hr>
			<div class="space-y-6 p-6 mt-5">
				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="vehicleBrand"
							class="text-sm font-light text-gray                                                                             ">
							Vehicle Brand</label>
						<input v-model="form.vehicleBrand" type="text" name="vehicleBrand"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="vehicleName"
							class="text-sm font-light text-gray                                                                             ">Vehicle
							Name</label>
						<input v-model="form.vehicleName" type="text" name="vehicleName"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>

				<div class="w-full">
					<label for="plateNumber"
						class="text-sm font-light text-gray                                                                             ">Vehicle
						Plate Number </label>
					<input v-model="form.plateNumber" type="text" name="plateNumber"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>

				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="vehicleCapacity"
							class="text-sm font-light text-gray                                                                             ">
							Vehicle Capacity</label>
						<input v-model="form.vehicleCapacity" type="number" name="vehicleCapacity"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
					<div class="w-full">
						<label for="vehicleType"
							class="text-sm font-light text-gray                                                                             ">
							Vehicle Type</label>
						<select v-model="form.vehicleType" name="vehicleType"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
							<opion default selected>
								Select a vehicele type
							</opion>
							<option value="seda">
								Sedan
							</option>
							<option value="mini_van">
								Mini Van
							</option>
							<option value="mini_bus">
								Mini Bus
							</option>
							<option value="bus">
								Bus
							</option>
						</select>
					</div>
				</div>

				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="vehicleCode"
							class="text-sm font-light text-gray                                                                             ">
							Vehicle Code</label>
						<input v-model="form.vehicleCode" type="text" name="vehicleCode"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
					<div class="w-full">
						<label for="vehiclePartner"
							class="text-sm font-light text-gray                                                                             ">
							Vehicle Partner</label>
						<select v-model="form.vehiclePartner" name="vehiclePartner"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
							<opion default selected>
								Select a partner
							</opion>
						</select>
					</div>
				</div>

				<div class="w-full">
					<label for="amenities"
						class="text-sm font-light text-gray                                                                             ">
						Vehicle Amenities </label>
					<input v-model="form.amenities" type="text" name="amenities"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>
				<hr>
				<div class="">
					<input v-model="isChecked" type="checkbox" class="inline" @change="handleChange"> <label
						class="inline">Add Tracking details</label>
				</div>

				<div v-if="isChecked" class="spacefull">
					<div class="w-full">
						<label for="trackingId"
							class="text-sm font-light text-gray                                                                             ">Vehicle
							Tracking ID </label>
						<input v-model="form.trackingID" type="text" name="trackingId"
							class="w-6/12 outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>

					<div class="w-full">
						<label for="providerName"
							class="text-sm font-light text-gray                                                                             ">Vehicle
							Provides Name </label>
						<input v-model="form.providerName" type="text" name="providerName"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>

					<div class="w-full">
						<label for="providerDescription"
							class="text-sm font-light text-gray                                                                             ">Vehicle
							Provider Description </label>
						<textarea v-model="form.providerDescription" rows="6" cols="6" name="providerDescription" />
					</div>
				</div>

				<div>
					<button class="text-white bg-black rounded-md px-6 py-2.5 text-xm">
						Add Vehicle
					</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const isChecked = ref(false)

const form = ref({
    vehicleBrand: '',
    vehicleName: '',
    plateNumber: '',
    vehicleCapacity: '',
    vehicleType: '',
    vehicleCode: '',
    vehiclePartner: '',
    amenities: '',
    trackingID: '',
    providerName: '',
    providerDescription: ''

})

const handleChange = (val) => {
    if (val.target.checked) {
        isChecked.value = !isChecked.value
    }
}
</script>

<style></style>
