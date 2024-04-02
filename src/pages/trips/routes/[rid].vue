<template>
	<div class="flex h-full">
		<ModulesRoutesCreateForm v-if="!suggestionLoading" class="md:min-w-[360px] w-4/12" />
		<Skeleton v-else class="md:min-w-[360px]" />

		<MapDisplay :start-point="startPosition" :end-point="endPosition" :props-loading="ploylineLoading || suggestionLoading" :encoded-polyline="polyline" class="w-8/12 rounded-br-xl" height="87vh" />
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
