<template>
	<HeadersHeaderSlot title="Sales agents" pre-title="Overview">
		<template #actions>
			<div class="flex items-center space-x-2">
				<Icon name="route" class="w-11 border p-2 rounded-full" @click="openCard" />
				<button class="btn-outline" @click="useRouteModal().openConfigureAgentPoints()">
					Configure currency
				</button>
				<NuxtLink to="/agents/create" class="btn-primary">
					Create agent
				</NuxtLink>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
import { useOpenRouteRequest } from '@/composables/modules/agents/routeRequest'
import { useRouteModal } from '@/composables/core/modals'

const { openCard } = useOpenRouteRequest()

</script>
<style scoped></style>
