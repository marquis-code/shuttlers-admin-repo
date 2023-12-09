<template>
	<HeadersHeaderSlot :title="`${selectedCorporate.corporate_name}`" pre-title="Overview" :loading="Object.keys(selectedCorporate).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<div class="flex items-center space-x-2">
				<ButtonIconDropdown button-text="Actions" :children="dropdownChildren" :data="selectedCorporate" class="px-4 bg-black text-white border-2 rounded-lg border-gray-950" />
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useUpdateCorporateStatus } from '@/composables/modules/corporates/updateStatus'
import { useCompaniesModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { updateCorporateStatus, loading: processingStatusUpdate } = useUpdateCorporateStatus()
const { selectedCorporate, getCorporateById } = useCorporateIdDetails()

if (Object.keys(selectedCorporate.value).length === 0) {
    const id = useRoute().params.id as string
    getCorporateById(id)
}

const status = ref(selectedCorporate.value.active === 1 ? 'active' : 'inactive')

const pageTabs = computed(() => [
    {
        name: 'Company Info',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/company-info`
    },
    {
        name: 'Stats',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/stats`
    },
    {
        name: 'Staff',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/staff`
    },
    {
        name: 'Wallet',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/wallet`
    },
    {
        name: 'Trip report',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/trip-report`
    },
    {
        name: 'Groups',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/company-groups`
    },
    {
        name: 'Credit Line',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/credit-line`
    },
    {
        name: 'Capacity Configuration',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/capacity-configuration`
    },
    {
        name: 'Routes',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/routes`
    },
    {
        name: 'Requests',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/requests`
    },
    {
        name: 'Corporate Pay',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/corporate-pay`
    },
    {
        name: 'Staff Settings',
        path: `/companies/${selectedCorporate.value.id}/${status.value}/staff-settings`
    }
])
const router = useRouter()
const route = useRoute()
const dropdownChildren = computed(() => [
	{ name: 'Update Information', func: (data) => editCompany(data) },
	{ name: 'Wallet payment options', func: (data) => { useCompaniesModal().openCorporateWalletOptions() } },
    { name: 'Create group', func: (data) => { useCompaniesModal().openCreateCorporateGroup() } },
    { name: 'Booking Cancellation Config', func: (data) => { useCompaniesModal().openCorporateBookingCancellation() } },
    { name: 'Export Manifest', func: (data) => { useCompaniesModal().openCorporateManifestExport() } },
    { name: `${selectedCorporate.value.active ? 'Suspend' : 'Un-suspend'} Company`, func: (data) => updateCorporateActivityStatus(data) }
])

const updateCorporateActivityStatus = (data: any) => {
	const actionType = data.active === 1 ? 'suspend' : 'un-suspend'
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: `Are you sure you want to ${actionType} this company?`,
		loading: processingStatusUpdate,
		call_function: () => updateCorporateStatus(data.id, actionType)
    })
}

const editCompany = (data) => {
	navigateTo({
        path: `/companies/${data.id}/edit`,
        query: {
            tab: 'company-information'
        }
    })
}
</script>

<style scoped>

</style>
