<template>
	<HeadersHeaderSlot :title="`${selectedPartner?.owner?.fname} ${selectedPartner?.owner?.lname}`" pre-title="VEHICLE PARTNER OVERVIEW" :loading="Object.keys(selectedPartner).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<div class="flex items-center gap-3">
				<ButtonIconDropdown v-if="$route.fullPath.includes('vehicles')"
					class="bg-black font-medium text-white rounded-lg" button-text="Link Vehicle"
					:children="vehicleDropdownChildren"
					class-name="w-fit"
				/>
				<ButtonIconDropdown
					class="bg-black font-medium text-white rounded-lg" button-text="Actions"
					:children="dropdownChildren"
					:data="selectedPartner" class-name="w-56"
				/>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { usePartnerModal } from '@/composables/core/modals'
import { usePartnerIdDetails, useSuspendPartner, useUpdatePartnerInfo, useUpdatePartnerPassword } from '@/composables/modules/partners'

const { selectedPartner, getPartnerById } = usePartnerIdDetails()
const { initSuspension } = useSuspendPartner()
const { initUpdate } = useUpdatePartnerInfo()
const { initUpdatePassword } = useUpdatePartnerPassword()

if (Object.keys(selectedPartner.value).length === 0) {
    const id = useRoute().params.id as string
    getPartnerById(id)
}

const pageTabs = computed(() => [
    {
        name: 'Partner Information',
        path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/partner-info`
    },
    {
        name: 'Vehicles',
        path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/vehicles`
    },
    {
        name: 'Drivers',
        path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/drivers`
    },
    {
        name: 'Completed Trips',
        path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/completed-trips`
    },
    {
        name: 'Account & Payslip',
        path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/accounts`
    }
])

const dropdownChildren = computed(() => [
	{ name: selectedPartner.value.status === 'active' ? 'Suspend' : 'Un-suspend', func: (data) => { initSuspension(data) } },
	{ name: 'Update Personal Information', func: (data) => { initUpdate(data) } },
    { name: 'Update Partner Password', func: (data) => { initUpdatePassword(data) } }
	// { name: 'Duplicate', func: (data) => { useRouteModal().openRouteDuplicationModal() } },
	// { name: 'Delete', func: (data) => { handleRouteDelete(data) }, class: '!text-red' }
])

const vehicleDropdownChildren = computed(() => [
	{ name: 'Link Vehicle', func: () => { usePartnerModal().openLinkVehicle() } },
	{ name: 'Batch Linking', func: () => { usePartnerModal().openBatchLinkVehicle() } }
])
</script>

<style scoped>

</style>
