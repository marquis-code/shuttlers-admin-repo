<template>
	<Modal
		modal="$atts.modal"
		title="Update Vehicle"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="updateVehicle">
			<div class="field relative">
				<label for="brand">Vehicle Brand</label>
				<input id="brand" v-model="brand.value" type="tel" class="input-field" required>
			</div>
			<div class="field relative">
				<label for="ame">Vehicle Name</label>
				<input id="ame" v-model="name.value" type="text" class="input-field" required>
			</div>

			<div class="field relative">
				<label for="plateNumber">Vehicle Plate Number</label>
				<textarea id="plateNumber" v-model="plate_no.value" rows="6" cols="6" class="input-field" required />
			</div>
			<div class="field relative">
				<label for="capacity">Vehicle Capacity</label>
				<textarea id="capacity" v-model="capacity.value" rows="6" cols="6" class="input-field" required />
			</div>
			<div class="field relative">
				<label for="vehicleType">Vehicle Type</label>
				<textarea id="vehicleType" v-model="type.value" rows="6" cols="6" class="input-field" required />
			</div>
			<div class="field relative">
				<label for="vehicleCode">Vehicle Code</label>
				<textarea id="vehicleCode" v-model="code.value" rows="6" cols="6" class="input-field" required />
			</div>
			<!-- <div class="field relative">
				<label for="inventory_type">Vehicle inventory Type</label>
				<textarea id="inventory_type" v-model="updateForm.provider_description.value" rows="6" cols="6" class="input-field" required />
			</div> -->
			<div class="field relative">
				<label for="vehicleAmenities">Vehicle Amenities</label>
				<textarea id="vehicleAmenities" v-model="amenities.value" rows="6" cols="6" class="input-field" required />
			</div>

			<div class="flex justify-between items-center gap-x-10">
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!loading" class="text-sm">Update</span>
					<Spinner v-else />
				</button>
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full" @click="useAdminModal().closeChangePassword()">
					Cancel
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useEditVehicles } from '@/composables/modules/fleets/vehicles/update'
const { loading, name, brand, plate_no, capacity, type, code, amenities, openEditBus, clearObj, updateVehicle } = useEditVehicles()
</script>
