<template>
	<HeadersHeaderSlot title="Company Insights" pre-title="Overview">
		<template #actions>
			<div class="flex items-center space-x-2">
				<button class="px-4 py-2 bg-black text-white text-sm border-2 rounded-lg border-gray-950" @click="navigateToCreateCompany">
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

const navigateToCreateCompany = () => {
	navigateTo({
        path: '/companies/add-company',
        query: {
            tab: 'company-information'
        }
    })
}
</script>

<style scoped></style>
