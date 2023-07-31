<template>
	<HeadersHeaderSlot title="Vehicle Partners" pre-title="Overview">
		<template #actions>
			<button class="btn-primary">
				Add Partner
			</button>
		</template>
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'All partners',
        path: '/partners'
    },
    {
        name: 'New partners',
        path: '/partners/new-partners'
    },
    {
        name: 'Interested partners',
        path: '/partners/interested-partners'
    }

]
</script>

<style scoped></style>
