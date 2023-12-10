<template>
	<HeadersHeaderSlot :title="$route.fullPath.includes('partners/create') ? 'Create Partner' : 'Vehicle Partners'" pre-title="Overview">
		<template #actions>
			<NuxtLink v-if="!$route.fullPath.includes('partners/create')" to="/partners/create" class="btn-primary">
				Add Partner
			</NuxtLink>
		</template>
		<template #tabs>
			<RouterTabs v-if="!$route.fullPath.includes('partners/create')" :tabs="pageTabs" />
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
