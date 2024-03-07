<template>
	<Modal modal="$atts.modal" title="Edit Vehicle Information">
		<form class="flex flex-col gap-4 w-full" @submit.prevent="updateVehicle">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-1">
					<label class="label">Vehicle brand</label>
					<input v-model.trim="brand" class="input-field">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Vehicle name</label>
					<input v-model.trim="name" class="input-field">
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-1">
					<label class="label">Vehicle plate number</label>
					<input v-model.trim="plate_no" class="input-field">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Vehicle Capacity</label>
					<input v-model.trim="capacity" class="input-field">
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-1">
					<label class="label">Vehicle type</label>
					<select v-model="type" class="input-field">
						<option v-for="n in allVehicles" :key="n.id" :value="n.name">
							{{ n.name }}
						</option>
					</select>
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Vehicle code</label>
					<input v-model.trim="code" class="input-field">
				</div>
			</div>
			<div class="flex flex-col gap-1">
				<label class="label">Vehicle inventory Type</label>
				<select v-model="inventory_type" class="input-field py-3">
					<option value="charter">
						Charter
					</option>
					<option value="regular">
						Regular
					</option>
					<option value="one-off">
						One-off
					</option>
				</select>
			</div>
			<div v-if="amenities" class="flex flex-col gap-1">
				<label class="label">Vehicle amenities</label>
				<div class="flex items-center gap-4 flex-wrap">
					<div v-for="amenity in computedAmenitiesList" :key="amenity.id"
						class="flex items-center gap-x-1 flex-wrap">
						<input :id="`checkbox-${amenity.id}`" v-model="amenities" type="checkbox" :value="amenity.id">
						<label :for="`checkbox-${amenity.id}`" class="font-medium text-gray-800">{{ amenity.name
						}}</label>
					</div>
				</div>
			</div>
			<button type="submit" :disabled="loading"
				class="mt-10 text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Update Vehicle' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useEditVehicles } from '@/composables/modules/fleets/vehicles/update'
import { useAllVehicleType, useAmenitiesList } from '@/composables/modules/configure/fetch'
const { allVehicles, getAllVehicleWithoutLimit } = useAllVehicleType()
const { loading, name, brand, type, capacity, plate_no, amenities, code, inventory_type, clearObj, updateVehicle } = useEditVehicles()
const { getAmenitiesList, amenitiesList } = useAmenitiesList()
getAllVehicleWithoutLimit()
getAmenitiesList()
onBeforeUnmount(() => clearObj())

const computedAmenitiesList = computed(() => {
	return amenitiesList.value.map((amenity: any) => ({
		...amenity,
		checked: selectedAmenitiesIds.value.includes(amenity.id)
	}))
})

const selectedAmenitiesIds = computed(() => {
	return amenities.value.map((amenity: any) => amenity.id)
})
</script>

<style scoped>
label {
	margin: 0;
}
</style>
