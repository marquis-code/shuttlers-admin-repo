<template>
	<HeadersHeaderSlot title="Customer App" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Trip Rating Settings',
        path: '/configuration/trip-rating-settings'
    }
]
</script>

<style scoped></style>
