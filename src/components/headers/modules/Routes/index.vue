<template>
	<HeadersHeaderSlot title="Route" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<button class="border-gray-800 text-gray-800 bg-white">
				Create batch booking
			</button>
			<button class="border-gray-800 text-gray-800 bg-white">
				Availability Config
			</button>
			<button class="btn-primary">
				Create route
			</button>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Main Routes',
        path: '/trips/routes/'
    },
    {
        name: 'Routes Availability',
        path: '/trips/routes/suspended'
    }

]
</script>

<style scoped></style>
