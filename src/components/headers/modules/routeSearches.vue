<template>
	<HeadersHeaderSlot title="Route Searches" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Traffic Flow',
        path: '/route-searches'
    },
    {
        name: 'Top Origin',
        path: '/route-searches/top-destination'
    },
    {
        name: 'Top Destination',
        path: '/route-searches/top-origin'
    }
]
</script>

<style scoped>

</style>
