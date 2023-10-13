<template>
	<HeadersHeaderSlot title="Vehicle" pre-title="Overview">
		<template #actions>
			<div class="flex items-center gap-x-3">
				<button class="btn-primary">
					New Inspection Site
				</button>
				<button class="btn-primary">
					New Vehicle Category
				</button>
			</div>
		</template>
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Category Management',
        path: '/configuration/vehicle-category-management'
    },
    {
        name: 'Inspection Sites',
        path: '/configuration/vehicle-category-management/inspection-sites'
    }
]
</script>

<style scoped></style>
