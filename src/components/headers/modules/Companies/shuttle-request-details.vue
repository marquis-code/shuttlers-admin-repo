<template>
	<HeadersHeaderSlot :title="`${selectedRequest?.name}`" pre-title="Overview" :loading="Object.keys(selectedRequest).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<div class="flex items-center space-x-2">
				<ButtonIconDropdown button-text="Actions" :children="dropdownChildren" :data="selectedRequest" class="px-4 text-gray-800 bg-black text-white border-2 rounded-lg border-gray-950" />
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useGetCorporateShuttleRequests } from '@/composables/modules/corporates/shuttleRequest'
import { useGetCorporateShuttleRequestsDetails } from '@/composables/modules/corporates/shuttleRequestDetails'
const { getCorporateShuttleRequestDetails } = useGetCorporateShuttleRequestsDetails()
const { selectedRequest } = useGetCorporateShuttleRequests()

if (Object.keys(selectedRequest.value).length === 0) {
    const id = useRoute().params.id as string
    getCorporateShuttleRequestDetails()
}

const pageTabs = computed(() => [
    {
        name: 'Shuttle Information',
        path: `/companies/shuttle-requests/${selectedRequest.value.id}/info`
    },
    {
        name: 'Staff List',
        path: `/companies/shuttle-requests/${selectedRequest.value.id}/staff-list`
    }
])

const dropdownChildren = computed(() => [
	{ name: 'Accept', func: (data) => { acceptShuttleRequest } },
	{ name: 'Shuttle cost', func: (data) => { handleShuttleCost } },
    { name: 'Reject', func: (data) => { rejectShuttleRequest } }
])

const acceptShuttleRequest = () => {
    useConfirmationModal().openAlert({
        title: 'You’re about to delete an amenity ?',
		type: 'NORMAL',
        desc: 'You’re about to delete this vehicle amenity, if this is action was not intentional please cancel ?',
		loading,
		call_function: () => deleteAmenity(data.id)
    })
}
const handleShuttleCost = () => { }
const rejectShuttleRequest = () => {
    useConfirmationModal().openAlert({
        title: 'You’re about to delete an amenity ?',
		type: 'NORMAL',
        desc: 'You’re about to delete this vehicle amenity, if this is action was not intentional please cancel ?',
		loading,
		call_function: () => deleteAmenity(data.id)
    })
}
</script>

<style scoped>

</style>
