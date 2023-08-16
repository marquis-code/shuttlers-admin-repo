<template>
	<HeadersHeaderSlot title="Companies" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>

		<template #actions>
			<div class="flex items-center space-x-2">
				<button class="px-4 py-2 text-gray-800 bg-white border-2 rounded-lg border-gray-950">
					Add Company
				</button>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Active companies',
        path: '/companies'
    },
    {
        name: 'New Sign ups',
        path: '/companies/interests'
    },
    {
        name: 'Demo requests',
        path: '/companies/demo-requests'
    }
]
</script>

<style scoped></style>
