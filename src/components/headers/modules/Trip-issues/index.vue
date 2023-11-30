<template>
	<HeadersHeaderSlot title="Trip Issues" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<button class="p-2 rounded-md text-sm text-light bg-dark px-4" @click="useTripsModal().openCreateIssues()">
				Log Issues
			</button>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useTripsModal } from '@/composables/core/modals'

const pageTabs = [
    { name: 'Follow up', path: '/trip-issues' },
    { name: 'Resolved', path: '/trip-issues/resolved' }
]
</script>

<style scoped></style>
