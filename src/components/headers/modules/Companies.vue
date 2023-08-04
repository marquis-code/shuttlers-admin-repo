<template>
	<HeadersHeaderSlot title="Companies" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>

		<template #actions>
			<div class="space-x-2 flex items-center">
				<button class="border-2 border-gray-950 bg-white text-gray-800 py-2 rounded-lg px-4">
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
