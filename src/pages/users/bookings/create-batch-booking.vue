<template>
	<main>
<<<<<<< HEAD:src/pages/users/bookings/create-batch-booking.vue
		<div class="mb-6">
			<button class="px-3 py-2 text-xs text-gray-900 bg-gray-200 rounded-lg text" @click="router.go(-1)">
				Go back
			</button>
		</div>
		<div class="w-11/12 bg-white border rounded-md lg:w-8/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Batch book a trip
				</p>
			</div>
			<hr>
			<form class="p-6 mt-5 space-y-6">
				<div class="w-full">
					<label for="" class="text-sm font-light text-gray">
						Upload Customer emails (csv only)Download csv template</label>
					<input type="file" name=""
						class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
				</div>

				<div class="w-full">
					<label for="" class="text-sm font-light text-gray">
						Select Route</label>
					<input type="text" name=""
						class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
				</div>

				<div class="w-full">
					<label for="" class="text-sm font-light text-gray">
						Select Itinerary</label>
					<input type="text" name=""
						class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
				</div>

				<div class="items-center justify-between lg:flex lg:gap-x-10 gap-y-10 lg:gap-y-0">
					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							Select Pickup Point</label>
						<input type="text" name=""
							class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
					</div>

					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							Select Drop-off Point</label>
						<input type="text" name=""
							class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
					</div>
				</div>
				<div class="w-full lg:w-6/12">
					<label for="" class="text-sm font-light text-gray">
						Choose Date</label>
					<date-picker v-model:value="form.bookingDate" style="width: 100%" class="font-light"
						placeholder="Filter by date" />
					<!-- <input type="text" name=""
						class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900"> -->
				</div>
				<div class="w-full lg:w-6/12">
					<label for="" class="text-sm font-light text-gray">
						Select Payment Source</label>
					<input type="text" name=""
						class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
				</div>
				<div class="space-x-2">
					<span class="text-sm text-gray-500">Is Subscription?</span>
					<input type="checkbox" name="" class="px-3 py-2 border rounded-md outline-none focus:border-gray-900">
				</div>
				<div class="space-x-2">
					<span class="text-sm text-gray-500">With Luggage?</span>
					<input type="checkbox" name="" class="px-3 py-2 border rounded-md outline-none focus:border-gray-900">
				</div>
				<div>
					<button class="px-4 py-3 text-white bg-black rounded-lg">
						Confirm and Book Ride
					</button>
				</div>
			</form>
		</div>
=======
		<ModulesCreateBatchBooking />
>>>>>>> 44dc2adf1bad90c44115b335cdd7ce53c39fa409:src/pages/bookings/create-batch-booking.vue
	</main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style scoped></style>
