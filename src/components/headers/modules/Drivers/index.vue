<template>
	<HeadersHeaderSlot title="Drivers" pre-title="Overview">
		<template #actions>
			<div class="flex gap-2 items-stretch">
				<NuxtLink to="/drivers/notify" class="border border-gray-950 bg-white text-gray-800 py-1.5 rounded-lg px-4">
					Notify
				</NuxtLink>
				<NuxtLink to="/drivers/add" class="btn-primary py-2 font-normal">
					Add Driver
				</NuxtLink>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
</script>
<style scoped></style>
