<template>
	<section class="flex flex-col gap-4 items-start">
		<ButtonGoBack class="mt-5" />
		<main v-if="!loadingRental" class="flex gap-4 w-full">
			<ModulesTripsRentalSectionOne :rental-details="rentalDetails" />
			<section class="w-6/12 flex flex-col gap-4">
				<form class="card" @submit.prevent="updateCharterOrder(rentalDetails)">
					<h1 class="card-header">
						Admin Feedback
					</h1>

					<div class="field relative">
						<label for="status">Select Status</label>
						<select v-if="rentalDetails.status === 'pending'" id="status" v-model="charterStatus" name="status" class="input-field" required :disabled="rentalDetails.status !== 'pending'">
							<option value="" disabled selected>
								select
							</option>
							<option value="accepted">
								Accept
							</option>
							<option value="rejected">
								Reject
							</option>
						</select>

						<input v-else id="user" type="text" name="user" :value="rentalDetails.status" class="input-field" disabled>
					</div>

					<section v-if="charterStatus !== 'rejected'" class="flex flex-col gap-4 mt-5 w-full">
						<div v-for="(vehicle, idx) in charterVehicleOrder" :key="vehicle.id" class="field relative w-full">
							<label for="">Vehicle {{ idx+1 }} </label>
							<div class="grid grid-cols-2 gap-4 w-full">
								<input id="user" type="text" name="user" :value="vehicle.charterVehicle.name" class="input-field" disabled>
								<div id="admin" name="price" placeholder="Enter price" class="input-field" required @click="updateVehicle(vehicle)">
									{{ vehicle.price }}
								</div>
							</div>
						</div>
					</section>

					<div class="flex justify-end mt-12">
						<button class="btn-primary" :disabled="loading || rentalDetails.status !== 'pending'">
							<span v-if="!loading" class="flex justify-center items-center gap-2.5">
								Update request
							</span>
							<Spinner v-else />
						</button>
					</div>
				</form>

				<div v-if="isEmptyObject(rentalDetails?.userRoute)" class="card text-center">
					<b>No Route available</b> <br>

					The routes would be visible when the request has been accepted
				</div>

				<div v-else class="card">
					<h1 class="card-header">
						Assigned routes
					</h1>

					<div class="flex gap-3 flex-wrap">
						<nuxt-link :to="`/trips/routes/${rentalDetails.route.id}/details/`" class="badge">
							{{ rentalDetails.route.route_code }} - {{ rentalDetails.route.pickup }} - {{ rentalDetails.route.destination }}
						</nuxt-link>
					</div>
				</div>
			</section>
		</main>
		<Skeleton v-else height="100vh" />
	</section>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useGetRentalById } from '@/composables/modules/Rentals/id'
import { isEmptyObject } from '@/composables/utils/basics'
import { useUpdateCharter } from '@/composables/modules/Rentals/update'

const id = useRoute().params.id as string

const { getRentalById, loadingRental, rentalDetails } = useGetRentalById()

const { charterVehicleOrder, updateCharterOrder, loading, charterStatus, updateVehicle } = useUpdateCharter()

getRentalById(id)

watch(rentalDetails, () => {
	charterVehicleOrder.value = []
	if (!isEmptyObject(rentalDetails.value)) {
		charterVehicleOrder.value = []
		rentalDetails.value.vehicle_orders.forEach((vehicle) => {
			vehicle.price = vehicle.cost || ''
			charterVehicleOrder.value.push(vehicle)
		})
	}
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

usePageHeader().setPageHeader({
	preTitle: 'Overview',
	title: 'Rental Details'
})
</script>

<style scoped>
.badge{
	@apply rounded-md bg-[#EFF2F7] p-2
}
</style>
