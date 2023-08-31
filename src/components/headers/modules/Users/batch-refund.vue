<template>
	<HeadersHeaderSlot :title="$route.name ==='users-batch-refund' ? 'Batch Refund': 'Log Batch refund'" pre-title="Overview">
		<template #actions>
			<div class="flex items-center space-x-2">
				<NuxtLink v-if="$route.name ==='users-batch-refund'" to="/users/batch-refund/create" class="btn-primary">
					Log Refund
				</NuxtLink>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
</script>
<style scoped></style>
