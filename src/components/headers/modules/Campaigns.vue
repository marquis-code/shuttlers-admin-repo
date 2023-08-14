<template>
	<HeadersHeaderSlot title="Admin controls" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
	{
		name: 'Valentine',
		path: '/campaigns'
	}

]
</script>

<style scoped></style>
