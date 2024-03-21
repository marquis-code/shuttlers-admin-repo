<template>
	<div class="">
		<div class="flex h-[calc(100vh-90px)]">
			<ModulesRoutesCreateForm v-if="!suggestionLoading" class="md:min-w-[360px]" />
			<Skeleton v-else class=" min-h-screen md:min-w-[360px]" />

			<MapDisplay :start-point="startPosition" :end-point="endPosition" :props-loading="ploylineLoading || suggestionLoading" :encoded-polyline="polyline" class="w-8/12 min-h-screen rounded-md" height="100vh" />
		</div>
	</div>
</template>

<script setup lang="ts">

import { useCreateRoute } from '@/composables/modules/routes/create'
import { usePageHeader } from '@/composables/utils/header'
import { useGetAgentRouteSuggestionsById } from '@/composables/modules/agents/id'

const { endPosition, startPosition, loading, polyline, ploylineLoading } = useCreateRoute()

const { getAgentRouteSuggestionsById, loading: suggestionLoading } = useGetAgentRouteSuggestionsById()
const routeId = useRoute().params.rid as string
getAgentRouteSuggestionsById(routeId, true)

definePageMeta({
  layout: 'dashboard-zero',
  middleware: ['is-authenticated']
})

usePageHeader().setPageHeader({
  title: 'Create Sales Agent Suggested Route'
})

</script>
