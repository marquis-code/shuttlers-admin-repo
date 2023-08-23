<template>
	<HeadersHeaderSlot title="Admin controls" pre-title="Overview">
		<template #actions>
			<NuxtLink to="/admin/add" class="text-white bg-black rounded-md px-6 py-2.5 text-xm">
				Add Staff
			</NuxtLink>
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

<style scoped></style>
