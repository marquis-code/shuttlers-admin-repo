<template>
	<HeadersHeaderSlot title="Drivers" pre-title="Overview">
		<template #actions>
			<div class="space-x-2 flex items-center">
				<NuxtLink to="/drivers/notify" class="border border-gray-950 bg-white text-gray-800 py-1.5 rounded-lg px-4">
					Notify
				</NuxtLink>
				<button class="btn-primary">
					Add Driver
				</button>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
</script>
<style scoped>
</style>
