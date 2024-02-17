<template>
	<HeadersHeaderSlot :title="`${selectedPartner?.owner?.fname} ${selectedPartner?.owner?.lname}`" pre-title="VEHICLE PARTNER OVERVIEW" :loading="Object.keys(selectedPartner).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<ButtonIconDropdown class="bg-black font-medium text-white px-3 py-1 rounded-lg" button-text="Actions" :children="dropdownChildren" :data="selectedPartner" class-name="w-56" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
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
</script>

<style scoped>

</style>
