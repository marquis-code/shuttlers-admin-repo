<template>
	<HeadersHeaderSlot title="Promotional Banner" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Banner',
        path: '/campaigns/promotions/banner'
    },
    {
        name: 'Carousel',
        path: '/campaigns/promotions/carousel'
    }

]
</script>

<style scoped></style>
