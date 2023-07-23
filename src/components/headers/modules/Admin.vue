<template>
	<HeadersHeaderSlot title="Admin controls" pre-title="Overview">
		<template #actions>
			<button class="btn-primary">
				Add Staff
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
        name: 'Access',
        path: '/admin'
    },
    {
        name: 'Audit Trail',
        path: '/admin/audit-trail'
    }

]
</script>

<style scoped>

</style>
