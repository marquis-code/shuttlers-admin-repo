<template>
	<HeadersHeaderSlot title="Amenities" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Amenities',
        path: '/configuration/vehicle-amenities'
    }
]
</script>

<style scoped></style>
