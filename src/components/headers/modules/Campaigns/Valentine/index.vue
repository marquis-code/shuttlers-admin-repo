<template>
	<HeadersHeaderSlot title="Games & Campaigns" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Valentine',
        path: '/campaigns/valentine'
    }

]
</script>

<style scoped></style>
