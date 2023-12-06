<template>
	<Modal
		modal="$atts.modal"
		title="Edit Vehicle Information"
	>
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
				<label class="label">Vehicle amenities</label>
				<input v-model.trim="amenities" class="input-field">
			</div>
			<button type="submit" :disabled="loading"
				class="mt-10 text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : 'Update Vehicle' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useEditVehicles } from '@/composables/modules/fleets/vehicles/update'
import { useAllVehicleType } from '@/composables/modules/configure/fetch'

const { allVehicles, getAllVehicleWithoutLimit } = useAllVehicleType()
const { loading, name, brand, type, capacity, plate_no, amenities, code, clearObj, updateVehicle } = useEditVehicles()

getAllVehicleWithoutLimit()
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
