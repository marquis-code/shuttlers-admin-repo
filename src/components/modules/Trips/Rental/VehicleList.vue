<template>
	<div class="flex flex-col relative pb-36">
		<div v-if="loading" class="grid md:grid-cols-2 gap-5">
			<Skeleton v-for="n in 4" :key="n" height="280px" width="100%" radius="8px" />
		</div>
		<div v-else class="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-12 pr-2 gap-5">
			<ModulesTripsRentalVehicleCard v-for="vehicle in vehicles" :key="vehicle.id" :data="vehicle" />
		</div>
		<footer v-if="selectedVehiclessList.length && Object.keys(selectedVehicle).length === 0 && step < 2" class="lg:hidden fixed bottom-0 inset-x-0 border-t p-4 grid grid-cols-1 items-end gap-4 bg-white">
			<button class="auth-form-btn" @click="step=2">
				Make a Request
			</button>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { useFetchCharterVehicle, useCharterVehicleUsage } from '@/composables/modules/Rentals'

const { step, selectedVehiclessList, selectedVehicle } = useCharterVehicleUsage()

const { fetch, loading, vehicles } = useFetchCharterVehicle()
fetch()
</script>

<style scoped>

</style>
