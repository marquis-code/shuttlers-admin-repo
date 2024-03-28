<template>
	<HeadersHeaderSlot title="Sales agents" pre-title="Overview">
		<template #actions>
			<div class="flex items-center space-x-2">
				<div class="relative border  p-2 rounded-full cursor-pointer">
					<span v-if="!loading" class="absolute -top-1 right-0 bg-green text-xs  rounded-full h-4 w-4 center text-light">
						{{ suggestedRoutes.length }}
					</span>
					<Icon name="route" class="w-7 " @click=" loading ? '' : openCard()" />
				</div>

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
import { useGetAgentsRoutes } from '@/composables/modules/agents/allRoute'

const { suggestedRoutes, loading } = useGetAgentsRoutes()

const { openCard } = useOpenRouteRequest()

</script>
<style scoped></style>
