<template>
	<HeadersHeaderSlot :title="`${selectedRoute.route_code} ${selectedRoute.pickup}-${selectedRoute.destination}`" pre-title="ROUTES" :loading="Object.keys(selectedRoute).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { usePartnerIdDetails } from '@/composables/modules/routes/id'

const { selectedRoute, getRouteById } = useRouteIdDetails()

if (Object.keys(selectedRoute.value).length === 0) {
    const id = useRoute().params.id as string
    getRouteById(id)
}

const pageTabs = computed(() => [
    {
        name: 'Details',
        path: `/trips/routes/${selectedRoute.value.id}/details`
    },
    {
        name: 'Bus Stops',
        path: `/trips/routes/${selectedRoute.value.id}/bus-stops`
    },
    {
        name: 'Itineraries',
        path: `/trips/routes/${selectedRoute.value.id}/itineraries`
    },
    {
        name: 'Trips',
        path: `/trips/routes/${selectedRoute.value.id}/trips`
    }
])
</script>
