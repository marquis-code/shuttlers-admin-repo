<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="bg-white rounded-md border lg:w-6/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Add a New Vehicle
				</p>
			</div>
			<hr>
			<form class="space-y-6 p-6 mt-5" @submit.prevent="handleCreateVehicle">
				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="vehicleBrand"
							class="text-sm font-light text-gray                                                                             ">
							Vehicle Brand</label>
						<input v-model="createForm.brand.value" type="text" name="vehicleBrand"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="vehicleName"
							class="text-sm font-light text-gray">Vehicle
							Name</label>
						<input v-model="createForm.name.value" type="text" name="vehicleName"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>

				<div class="w-full">
					<div class="relative">
						<div class="flex items-center gap-x-2 pb-2">
							<div>
								<label for="plateNumber"
									class="text-sm font-light text-gray">Vehicle
									Plate Number </label>
							</div>
							<div>
								<img src="@/assets/icons/source/info.svg" class="cursor-pointer h-5 w-5" alt="" @mouseover="showToolTip = true"
									@mouseout="showToolTip = false">
							</div>
						</div>
						<p v-if="showToolTip" class="absolute -top-2 bg-gray-50 text-sm left-[170px] shadow-sm text-gray-800 rounded-md px-3 py-2.5">
							example: ABC-123XY
						</p>
					</div>
					<input v-model="createForm.registration_number.value" pattern="[A-Za-z]{3}-\d{3}[A-Za-z]{2}" title="Plate number must be in the format ABC-123XY" required type="text" name="plateNumber"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>

				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="vehicleCapacity"
							class="text-sm font-light text-gray">
							Vehicle Capacity</label>
						<input v-model="createForm.seats.value" type="number" name="vehicleCapacity"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
					<div class="w-full">
						<label for="vehicleType"
							class="text-sm font-light text-gray">
							Vehicle Type</label>
						<div v-if="!loadingVehicleTypes">
							<select v-model="createForm.type.value" class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
								<option v-for="(itm, idx) in vehicleTypeslist" :key="idx" :value="itm.name">
									{{ itm.name }}
								</option>
							</select>
						</div>
						<Skeleton v-else height="46px" />
					</div>
				</div>

				<div class="lg:flex justify-between items-center gap-x-10 space-y-6 lg:space-y-0">
					<div class="w-full">
						<label for="vehicleCode"
							class="text-sm font-light text-gray                                                                             ">
							Vehicle Code</label>
						<input v-model="createForm.code.value" type="text" name="vehicleCode"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
					<div class="w-full">
						<PartnerSelector v-model="createForm.partner.value" />
					</div>
				</div>

				<div class="w-full">
					<label for="amenities"
						class="text-sm font-light text-gray                                                                             ">
						Vehicle Amenities </label>
					<input v-model="createForm.amenities.value" type="text" name="amenities"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>
				<div class="w-full">
					<label for="amenities"
						class="text-sm font-light text-gray                                                                             ">
						Vehicle inventory Type </label>
					<select v-model="createForm.inventory_type.value" name="vehicleType"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
						<option v-for="(itm, idx) in inventortTypes" :key="idx" :value="itm.value">
							{{ itm.text }}
						</option>
					</select>
				</div>
				<hr>
				<div class="">
					<input v-model="addtrackingDetails" :checked="addtrackingDetails" type="checkbox" class="inline"> <label
						class="inline">Add Tracking details</label>
				</div>

				<div v-if="addtrackingDetails" class="space-y-4">
					<div class="w-full">
						<label for="trackingId"
							class="text-sm font-light text-gray">Vehicle
							Tracking ID </label>
						<input v-model="trackingForm.tracking_id" type="text" name="trackingId"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>

					<div class="w-full">
						<label for="providerName"
							class="text-sm font-light text-gray">Vehicle
							Provides Name </label>
						<input v-model="trackingForm.provider_name" type="text" name="providerName"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>

					<div class="w-full">
						<label for="providerDescription"
							class="text-sm font-light text-gray">Vehicle
							Provider Description </label>
						<textarea v-model="trackingForm.provider_description" rows="4" class="w-full px-3 outline-none border border-gray-300 resize-none rounded-md" cols="4" name="providerDescription" />
					</div>
				</div>

				<div>
					<button :disabled="!isFormEmpty" type="submit" class="btn-primary w-full disabled:opacity-25 disabled:cursor-not-allowed bg-black">
						<span v-if="!loading" class="flex  justify-center text-sm items-center gap-2.5">
							Add vehicle
						</span>
						<Spinner v-else />
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useGetVehicleTypes } from '@/composables/modules/fleets/vehicle-types'
import { useCreateVehicle } from '@/composables/modules/fleets/create'
const { getFleetTypes, loading: loadingVehicleTypes, vehicleTypeslist } = useGetVehicleTypes()
const { createForm, loading, trackingForm, createVehicle, addtrackingDetails } = useCreateVehicle()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const isFormEmpty = computed(() => {
	return !!(createForm.brand.value && createForm.name.value && createForm.type.value && createForm.seats.value && createForm.registration_number.value)
})

onMounted(() => {
	getFleetTypes()
})
const showToolTip = ref(false)

const handleCreateVehicle = () => {
	createVehicle()
}

const inventortTypes = reactive([
	{
		text: 'Regular',
		value: 'regular'
	},
	{
		text: 'Charter',
		value: 'charter'
	},
	{
		text: 'One-Off',
		value: 'one_off'
	}
])
</script>

<style></style>
