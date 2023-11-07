<template>
	<main v-if="!loadingRental" class="flex gap-4">
		<ModulesTripsRentalSectionOne :rental-details="rentalDetails" />
		<section class="w-6/12 flex flex-col gap-4">
			<div class="card">
				<h1 class="card-header">
					Admin Feedback
				</h1>

				<div class="field relative">
					<label for="status">Select Status</label>
					<select id="status" name="status" class="input-field">
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
				</div>

				<section class="flex flex-col gap-4 mt-5">
					<div v-for="(vehicle, idx) in removeDuplicates(rentalDetails.vehicle_orders, 'charter_vehicle_id')" :key="vehicle.id" class="field relative">
						<label for="">Vehicle {{ idx+1 }} </label>
						<div class="grid grid-cols-2 gap-4">
							<input id="user" type="text" name="user" value="Vehicle" class="input-field" disabled>
							<input id="admin" type="text" name="user" placeholder="Enter price" class="input-field">
						</div>
					</div>
				</section>

				<div class="flex justify-end mt-12">
					<button class="btn-primary" :disabled="loading">
						<span v-if="!loading" class="flex justify-center items-center gap-2.5">
							Update request
						</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
			<div class="card text-center">
				<b>No Route available</b> <br>

				The routes would be visible when the request has been accepted
			</div>
		</section>
	</main>
	<Skeleton v-else height="100vh" />
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useGetRentalById } from '@/composables/modules/Rentals/id'
import { removeDuplicates } from '@/composables/utils/system'

const loading = ref(false)
const id = useRoute().params.id as string

const { getRentalById, loadingRental, rentalDetails } = useGetRentalById()

getRentalById(id)

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

</style>
