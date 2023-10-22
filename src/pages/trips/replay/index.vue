<template>
	<main class=" relative">
		<div class="h-screen inset-0 z-0">
			<MapDisplay height="100vh" :loading="loadingVehicle" :external-markers="[]" />
			<section v-if="!loadingVehicle && vehicleList.length > 0" class="absolute top-4 left-6 w-9/12 mx-auto flex gap-4 items-end z-40 bg-light p-3 card">
				<div class="field relative">
					<label for="vehicle">Vehicle</label>
					<select id="vehicle" v-model="selectedVehicle" class="input-field w-full" required>
						<option value="vehicleList">
							Select Vehicle
						</option>
						<option v-for="vehicle in vehicleList" :key="vehicle.id" :value="vehicle.vehicle_id">
							{{ vehicle.name }}
						</option>
					</select>
				</div>

				<div class="field relative">
					<label for="vehicle">Date Range</label>
					<InputDateInput range clearable />
				</div>

				<button class="btn-primary w-56 text-sm" :disabled="!selectedVehicle || loadingPosition" @click="getPosition(selectedVehicle)">
					<span v-if="!loadingPosition">	Get Replay</span>
					<Spinner v-else />
				</button>
			</section>

			<div v-if="!loadingVehicle && vehicleList.length > 0" class="fixed bottom-8 flex items-center justify-center w-full">
				ds
			</div>

			<Skeleton v-else-if="loadingVehicle" height="100px" width="80%" class="absolute top-4 left-6 mx-auto   z-40 " />

			<section v-else class="absolute top-4 left-6 w-9/12 mx-auto flex gap-4 items-end z-40 bg-light p-3 card">
				Something went wrong
			</section>
		</div>
	</main>
</template>
<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useRouteReplay } from '@/composables/modules/commute/replay/fetch'

const { getVehicle, getPosition, vehicleList, loadingVehicle, loadingPosition } = useRouteReplay()
getVehicle()

const selectedVehicle = ref('')

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

usePageHeader().setPageHeader({
	preTitle: 'OVERVIEW',
	title: 'Route Replay'
})

</script>

<style scoped></style>
