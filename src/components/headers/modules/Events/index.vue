<template>
	<HeadersHeaderSlot title="Events" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<nuxt-link to="/events/create" class="btn-primary">
				Create Event
			</nuxt-link>
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
