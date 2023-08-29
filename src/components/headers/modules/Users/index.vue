<template>
	<HeadersHeaderSlot title="Users" pre-title="Overview">
		<template #actions>
			<div class="space-x-2 flex items-center">
				<NuxtLink to="/bookings/create-batch-booking" class="border border-gray-950 bg-white text-gray-800 py-1.5 rounded-lg px-4">
					Create Batch Booking
				</NuxtLink>
				<NuxtLink to="/users/notify" class="btn-primary">
					Notify
				</NuxtLink>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
</script>
<style scoped></style>
