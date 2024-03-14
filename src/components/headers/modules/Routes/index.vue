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
				<button class="border-gray-800 text-sm text-gray-800 bg-white border rounded-md py-2.5 px-3" @click="handleRouteAvailabilityConfigModal">
					Availability Config
				</button>
				<NuxtLink to="/trips/routes/create" class="btn-primary text-sm">
					Create route
				</NuxtLink>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useCommuteModal } from '@/composables/core/modals'

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

const handleRouteAvailabilityConfigModal = () => {
  useCommuteModal().openRouteAvailabilityConfig()
}

</script>

<style scoped></style>
