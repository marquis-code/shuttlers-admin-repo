<template>
	<section class="card w-6/12">
		<h1 class="card-header">
			Customer Information
		</h1>
		<section class="flex flex-col gap-3">
			<div class="flex justify-between text-sm">
				<span class="labe">FULLNAME</span>
				<nuxt-link :to="`/users/${rentalDetails.user.id}/user-info`" class="link">
					{{ rentalDetails.user.fname }} {{ rentalDetails.user.lname }}
				</nuxt-link>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">EMAIL ADDRESS</span>
				<nuxt-link :to="`/users/${rentalDetails.user.id}/user-info`" class="link">
					{{ rentalDetails.user.email }}
				</nuxt-link>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">PHONE NUMBER</span>
				<span>{{ rentalDetails.user.phone }}  </span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">DATE CREATED</span>
				<span>{{ useDateFormat(rentalDetails.created_at, "MMMM d, YYYY, HH:MM A").value }} </span>
			</div>
		</section>

		<h1 class="card-header mt-7">
			Pickup Information
		</h1>
		<section class="flex flex-col gap-3">
			<div class="flex justify-between text-sm">
				<span class="labe">NUMBER OF VEHICLES</span>
				<span>{{ rentalDetails.vehicle_orders.length }}  </span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">ESTIMATED NO. OF PASSENGERS</span>
				<span>{{ rentalDetails.passengers }} </span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">PICKUP ADDRESS</span>
				<span>{{ rentalDetails.pickup_address }} </span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">PICKUP DATE</span>
				<span>{{ rentalDetails.pickup_date }} </span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">DROP OFF</span>
				<span>{{ rentalDetails.return_address }} </span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">NUMBER OF STOPS</span>
				<span>{{ rentalDetails.stops.length }} </span>
			</div>
		</section>

		<h1 class="card-header mt-7">
			Stops
		</h1>
		<section class="flex flex-col gap-3">
			<div v-for="(stop, idx) in rentalDetails.stops" :key="stop.address" class="flex justify-between text-sm">
				<span class="labe">STOP {{ idx +1 }}</span>
				<span>{{ stop.address }}  </span>
			</div>
		</section>

		<h1 class="card-header mt-7">
			Return Trip
		</h1>
		<section class="flex flex-col gap-3">
			<div class="flex justify-between text-sm">
				<span class="labe">RETURN ADDRESS</span>
				<span>{{ rentalDetails.return_address }}  </span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">PICKUP DATE</span>
				<span>{{ rentalDetails.return_date }} {{ rentalDetails.return_time }} </span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="labe">STATUS</span>
				<StatusBadge :name="rentalDetails.status" />
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
.labe{
    @apply text-grey5 font-bold
}
</style>
