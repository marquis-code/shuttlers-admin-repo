<template>
	<HeadersHeaderSlot title="Users" pre-title="Overview">
		<template #actions>
			<div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
				<NuxtLink to="/users/bookings/create-batch-booking" class="border text-xs font-semibold md:text-base text-center border-gray-950 bg-white text-gray-800 py-2.5 rounded-lg px-3">
					Create Batch Booking
				</NuxtLink>
				<NuxtLink to="/users/notify" class="border border-gray-950 text-xs font-semibold md:text-base bg-white text-center text-gray-800 py-2.5 rounded-lg px-3">
					Notify
				</NuxtLink>
				<NuxtLink to="/users/add" class="btn-primary text-xs font-semibold md:text-base py-2.5 font-light px-3">
					Add User
				</NuxtLink>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
</script>
<style scoped></style>
