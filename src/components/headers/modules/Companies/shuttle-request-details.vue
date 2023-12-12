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
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useGetCorporateShuttleRequests } from '@/composables/modules/corporates/shuttleRequest'
import { useGetCorporateShuttleRequestsDetails } from '@/composables/modules/corporates/shuttleRequestDetails'
import { useCompaniesModal } from '@/composables/core/modals'
import { useAcceptShuttleRequest } from '@/composables/modules/corporates/acceptShttleRequest'
const { getCorporateShuttleRequestDetails } = useGetCorporateShuttleRequestsDetails()
const { selectedRequest } = useGetCorporateShuttleRequests()
const { acceptShuttleRequest, loading } = useAcceptShuttleRequest()

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
	{
 name: 'Accept', func: (itm) => {
 useConfirmationModal().openAlert({
        title: 'Modify request??',
		type: 'NORMAL',
        desc: 'Are you sure you want to accept this shuttle request?',
		loading,
		call_function: () => acceptShuttleRequest(itm.id)
    })
}
},
	{ name: 'Shuttle cost', func: () => { handleShuttleCost } },
    { name: 'Reject', func: () => useCompaniesModal().openRejectShuttleRequest() }
])
const handleShuttleCost = () => { }
</script>

<style scoped>

</style>
