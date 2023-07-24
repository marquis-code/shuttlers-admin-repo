<template>
	<HeadersHeaderSlot title="Events" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
const pageTabs = [
    {
        name: 'Event Requests',
        path: '/events'
    },
    {
        name: 'Upcoming Events',
        path: '/events/upcoming'
    }
]
</script>
