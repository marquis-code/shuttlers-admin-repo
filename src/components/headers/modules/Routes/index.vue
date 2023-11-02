<template>
	<HeadersHeaderSlot title="Route" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<div class="flex items-center gap-x-4">
				<NuxtLink to="/users/bookings/create-batch-booking" class="border-gray-800 text-sm text-gray-800 bg-white border rounded-md py-2.5 px-3">
					Create batch booking
				</NuxtLink>
				<button class="border-gray-800 text-sm text-gray-800 bg-white border rounded-md py-2.5 px-3">
					Availability Config
				</button>
				<button class="btn-primary text-sm">
					Create route
				</button>
			</div>
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
    },
	{
        name: 'Routes Auction',
        path: '/trips/routes/auctions'
    }
]

</script>

<style scoped></style>
