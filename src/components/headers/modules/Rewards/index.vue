<template>
	<HeadersHeaderSlot title="Rewards" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Pilot points',
        path: '/campaigns/rewards'
    },
    {
        name: 'Pilot rewards',
        path: '/campaigns/rewards/pilot-rewards'
    },
    {
        name: 'Customers points',
        path: '/campaigns/rewards/customer-points'
    },
    {
        name: 'Customers reward',
        path: '/campaigns/rewards/customer-rewards'
    },
    {
        name: 'Agent points',
        path: '/campaigns/rewards/agent-points'
    }

]
</script>

<style scoped></style>
