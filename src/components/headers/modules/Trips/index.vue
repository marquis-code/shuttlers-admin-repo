<template>
	<HeadersHeaderSlot title="Trips" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Active Trips',
        path: '/trips/type/active'
    },
    {
        name: 'Upcoming Trips',
        path: '/trips/type/upcoming'
    },
    {
        name: 'Completed Trips',
        path: '/trips/type/completed'
    },
    {
        name: 'Bus Captains',
        path: '/trips/type/bus-captains'
    }

]
</script>

<style scoped></style>
