<template>
	<div class="relative h-full flex flex-col w-full ">
		<section class="h-full flex flex-col w-full py-9 pb-40 px-8 gap-5 relative overflow-y-auto">
			<div class="w-full flex justify-between items-center">
				<span class="text-xs flex gap-2">
					<Icon name="info_2" class="w-4" />
					Vehicles would differ from what is displayed
				</span>
				<Icon name="close" class="w-6 cursor-pointer" @click="selectedVehicle = {} as Vehicle" />
			</div>

			<div class="center px-5  bg-grey10 rounded-lg p-4">
				<img :src="selectedVehicle.images[count]" alt="car image" class=" object-cover rounded-lg h-[160px] ">
			</div>

			<div class="flex justify-between items-center">
				<div class="flex flex-col justify-start items-start">
					<h1 class="text-xl font-bold">
						{{ selectedVehicle.name }}
					</h1>
					<span class="flex items-center justify-center gap-1.5  text-sm ">
						<Icon name="star" class="w-4" />
						<p class="p-0 m-0">5.0 Ratings</p>
					</span>
				</div>
				<div class="flex flex-col w-auto">
					<span class="text-neut6 text-[11px]">Starting from</span>
					<h4 class="font-bold text-green7">
						{{ convertToCurrency(selectedVehicle.price) }}
					</h4>
				</div>
			</div>

			<p class="text-grey5 text-sm">
				{{ selectedVehicle.description }}
			</p>

			<div class="flex flex-col gap-4">
				<h2 class="font-bold">
					Amenities
				</h2>
				<div class="flex gap-6">
					<div v-for="n in selectedVehicle.amenities" :key="n.name" class="flex flex-col center font-bold text-grey4 gap-2">
						<img :src="n.image" alt="icon" class="w-14 border border-grey6 rounded-full p-4">
						{{ n.short_name }}
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<h2 class="font-bold">
					Things to know
				</h2>
				<div class="flex flex-col gap-4">
					<span class="text-xs flex gap-2">
						<Icon name="pet" class="w-4" />
						Pets are not allowed inside vehicle
					</span>
					<span class="text-xs flex gap-2">
						<Icon name="smoking" class="w-4" />
						No smoking
					</span>
					<span class="text-xs flex gap-2">
						<Icon name="bus" class="w-4" />
						Check into vehicle 30mins before time.
					</span>
				</div>
			</div>
		</section>
		<footer class="absolute bottom-0 inset-x-0 border-t p-4 grid grid-cols-2 items-end gap-4 bg-white">
			<div class="flex flex-col">
				<label for="name">Number of buses</label>
				<span class="border border-grey9 px-4 py-2 rounded-md">
					<!-- <Counter v-model="selectedVehicle.count" /> -->
					<ModulesTripsRentalCounter v-model="selectedVehicle.count" />
				</span>
			</div>

			<button class="auth-form-btn" @click="addToList">
				Add to charter
			</button>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { useCharterVehicleUsage, Vehicle } from '@/composables/modules/Rentals'
import { convertToCurrency } from '@/composables/utils/formatter'

const { selectedVehicle, selectedVehiclessList } = useCharterVehicleUsage()
const count = ref(0)

const addToList = () => {
	if (selectedVehiclessList.value.length > 0) {
		const index = selectedVehiclessList.value.findIndex((item) => item.id === selectedVehicle.value.id)
		if (index > -1) {
			selectedVehiclessList.value[index] = selectedVehicle.value
			selectedVehicle.value = {} as Vehicle
			return
		}
	}
	selectedVehiclessList.value.push(selectedVehicle.value)
	selectedVehicle.value = {} as Vehicle
}
</script>

<style scoped>

</style>
