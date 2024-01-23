<template>
	<HeadersHeaderSlot class="text-xs leading-relaxed font-light" :title="`${selectedRoute?.route_code} ${selectedRoute?.pickup}-${selectedRoute?.destination}`"
		pre-title="ROUTES" :loading="loadingRouteDetails"
	>
		<template v-if="!$route.fullPath.includes('edit')" #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template v-if="!$route.fullPath.includes('edit')" #actions>
			<ButtonIconDropdown class="bg-black font-medium text-white px-3 py-1 rounded-lg" button-text="Actions" :children="dropdownChildren" :data="selectedRoute" class-name="w-56" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useRouteModal } from '@/composables/core/modals'
import { useUpdateDeletion } from '@/composables/modules/routes/updateRoute/delete'
import { useUpdateRouteStatus } from '@/composables/modules/routes/updateRoute/update'
import { useRouteIdDetails } from '@/composables/modules/routes/id'
const { updateRoute, loading } = useUpdateRouteStatus()
const { selectedRoute, getRouteById, loadingRouteDetails } = useRouteIdDetails()
const { loading: deletingRoute, deleteRoute } = useUpdateDeletion()
const router = useRouter()

const id = useRoute().params.id as string
// getRouteById(id)

const pageTabs = computed(() => [
    {
        name: 'Details',
        path: `/trips/routes/${id}/details`
    },
    {
        name: 'Bus Stops',
        path: `/trips/routes/${id}/bus-stops`
    },
    {
        name: 'Itineraries',
        path: `/trips/routes/${id}/itineraries`
    },
    {
        name: 'Trips',
        path: `/trips/routes/${id}/trips`
    }
])

const dropdownChildren = computed(() => [
	{ name: 'Edit', func: (data) => editRoute() },
	{ name: 'suspend', func: (data) => { handleRouteStatus(data) } },
	{ name: 'Duplicate', func: (data) => { useRouteModal().openRouteDuplicationModal() } },
	{ name: 'Delete', func: (data) => { handleRouteDelete(data) }, class: '!text-red' }
])

const editRoute = () => {
    router.push(`/trips/routes/${id}/edit`)
}

const handleRouteStatus = (data: any) => {
	const actionType = data.status === 0 ? 'unsuspend' : 'suspend'
    useConfirmationModal().openAlert({
        title: `Sure to ${data.status === 0 ? 'Un-suspend' : 'suspend'} route?`,
		type: 'NORMAL',
        desc: `Customers will ${data.status === 0 ? 'will' : 'no longer'} discover this route when searching on the mobile`,
		loading,
		call_function: () => updateRoute(data.id, actionType)
    })
}

const handleRouteDelete = (data: any) => {
    useConfirmationModal().openAlert({
        title: 'Sure to delete route?',
		type: 'NORMAL',
        desc: 'Customers will no longer discover this route when searching on the mobile',
		loading: deletingRoute,
		call_function: () => deleteRoute(data.id)
    })
}
</script>
