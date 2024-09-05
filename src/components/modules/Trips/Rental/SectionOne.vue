<template>
	<section class="card w-full md:w-6/12 rounded-2xl">
		<h1 class="card-header">
			Rental Information
		</h1>
		<section class="flex flex-col gap-3">
			<div class="flex justify-between text-sm box">
				<span class="label">Requested by</span>
				<nuxt-link :to="`/users/${rentalDetails.user.id}/user-info`" class="link">
					{{ rentalDetails.user.fname }} {{ rentalDetails.user.lname }}
				</nuxt-link>
			</div>
			<div class="flex justify-between text-sm box">
				<span class="label">Departure date & time</span>
				<span>{{ rentalDetails.pickup_date }}, {{ rentalDetails.pickup_time }}</span>
			</div>
			<div class="flex justify-between text-sm box">
				<span class="label">Date created</span>
				<span>{{ useDateFormat(rentalDetails.created_at, "MM/DD/YYYY HH:mm A").value }}</span>
			</div>
			<div class="flex justify-between text-sm box">
				<span class="label">Auctioning to partner?</span>
				<span class="text-red-500">No</span>
			</div>
			<!-- <div class="flex justify-between text-sm items-center">
				<span class="label">Shuttlers Margin</span>
				<div class="flex items-center gap-2">
					<span>3%</span>
					<button class="btn btn-outline-xs">
						Update Margin
					</button>
				</div>
			</div> -->

			<div class="flex justify-between text-sm items-center box">
				<span class="label">Rental Status</span>
				<StatusBadge :name="rentalDetails.status" />
			</div>
			<div class="flex justify-between text-sm items-center box">
				<span class="label">Payment Status</span>
				<StatusBadge :name="rentalDetails?.userRoute?.booking_status || 'false'" />
			</div>
			<div class="flex justify-between text-sm items-end mt-4">
				<span class=" flex flex-col">
					<span>Amount to be paid</span>
					<span class="font-bold text-lg text-dark">₦0.00</span>
				</span>
				<button class="link">
					View cost information
				</button>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

defineProps({
	rentalDetails: {
		type: Object,
		required: true
	}
})
</script>

<style scoped>
.box {
	@apply border-b border-gray-200 pb-2;
}
.label {
	@apply text-gray-500 font-medium;
}
.card-header {
	@apply text-lg font-semibold mb-4;
}
</style>
