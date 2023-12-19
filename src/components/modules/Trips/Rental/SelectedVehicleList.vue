<template>
	<div class="relative h-full flex flex-col w-full">
		<section class="flex flex-col  h-full w-full py-7 pb-28 gap-5 relative overflow-y-auto">
			<div class="flex gap-4 text-lg text-black mb-9 cursor-pointer font-bold px-4" @click="step=1">
				<icon name="close" class="w-7" />
				Charter checkout
			</div>

			<div class="flex flex-col px-4 gap-4">
				<div v-for="vehicle in selectedVehiclessList" :key="vehicle.name" class="flex flex-col shd rounded-lg ">
					<div class="flex items-center justify-between py-6 px-4">
						<div class="flex items-center gap-2">
							<Icon name="delete" class="w-5 cursor-pointer text-red" @click="removeVehicle(vehicle)" />
							<div class="center px-5  bg-grey10 rounded-lg p-4">
								<img :src="vehicle.images[0]" alt="car image" class=" object-cover rounded-lg w-[60px]">
							</div>
							<span class="flex flex-col">
								<h1 class="text-base font-bold">{{ vehicle.name }}</h1>
								<p class="text-xs">No of vehicles: <span class="font-bold">{{ vehicle.count }}</span></p>
							</span>
						</div>
						<div class="flex flex-col w-auto">
							<span class="text-neut6 text-[11px]">Starting from</span>
							<h4 class="font-bold text-green7">
								{{ convertToCurrency(vehicle.price * vehicle.count) }}
							</h4>
						</div>
					</div>

					<footer class="border-t flex justify-between items-center px-4 py-4 mt-5 gap-2">
						<span class="text-xs">Vehicle quantity</span>
						<!-- <Counter v-model="vehicle.count" class="!w-32" /> -->
						<ModulesTripsRentalCounter v-model="vehicle.count" class="!w-32" />
					</footer>
				</div>
			</div>
		</section>
		<footer class="absolute bottom-0 inset-x-0 border-t p-4 grid grid-cols-1 items-end gap-4 bg-white">
			<button class="auth-form-btn" @click="step=3">
				Proceed
			</button>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { useCharterVehicleUsage } from '@/composables/modules/Rentals'
import { convertToCurrency } from '@/composables/utils/formatter'

const { selectedVehiclessList, step } = useCharterVehicleUsage()

const removeVehicle = (vehicle: any) => {
	vehicle.count = 1
	selectedVehiclessList.value = selectedVehiclessList.value.filter((v: any) => v.id !== vehicle.id)
}
</script>

<style scoped>
.shd{
box-shadow: 0px 2px 8px 0px rgba(94, 94, 94, 0.12);
}
</style>
