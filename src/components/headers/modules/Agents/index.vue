<template>
	<HeadersHeaderSlot title="Sales agents" pre-title="Overview">
		<template #actions>
			<div class="flex items-center space-x-2">
				<NuxtLink to="/agents/create" class="btn-primary">
					Create agent
				</NuxtLink>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
import { useRouteModal } from '@/composables/core/modals'

</script>
<style scoped></style>
