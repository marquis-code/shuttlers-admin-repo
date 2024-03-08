<template>
	<HeadersHeaderSlot :title="`${selectedAgent.fname} ${selectedAgent.lname}`" pre-title="Overview" :loading="Object.keys(selectedAgent).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useAgentIdDetails } from '@/composables/modules/agents/id'

const { selectedAgent, getAgentById } = useAgentIdDetails()

const id = useRoute().params.id as string
getAgentById(id)

const pageTabs = computed(() => [
    {
        name: 'Agents information',
        path: `/agents/${selectedAgent.value.id}/agent-info`
    },
    {
        name: 'Passengers',
        path: `/agents/${selectedAgent.value.id}/passengers`
    },
    {
        name: 'Agent routes',
        path: `/agents/${selectedAgent.value.id}/agent-routes`
    }

])
</script>

<style scoped>

</style>
