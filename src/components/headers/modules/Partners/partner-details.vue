<template>
	<HeadersHeaderSlot pre-title="VEHICLE PARTNER OVERVIEW" :loading="Object.keys(selectedPartner).length === 0">
		<template #title>
			<div class="flex items-center gap-2">
				<h3>
					{{ selectedPartner?.owner?.fname || 'N/A' }} {{ selectedPartner?.owner?.lname }}
				</h3>
				<p class="badge-blue text-sm capitalize">
					{{ selectedPartner?.mode }}
				</p>
			</div>
		</template>
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<div class="flex items-center gap-3">
				<ButtonIconDropdown v-if="(isVehiclePage || isDriverPage)"
					class="bg-black font-medium text-white rounded-lg" :button-text="isVehiclePage ? 'Link Vehicle' : 'Link Driver'"
					:children="isVehiclePage ? vehicleDropdownChildren : driverDropdownChildren"
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
import { isProdEnv } from '@/composables/utils/system'
import { AdminCanAttachPartnerDeductions } from '@/composables/flagging/flags'

const { selectedPartner, getPartnerById } = usePartnerIdDetails()
const { initSuspension } = useSuspendPartner()
const { initUpdate } = useUpdatePartnerInfo()
const { initUpdatePassword } = useUpdatePartnerPassword()

if (Object.keys(selectedPartner.value).length === 0) {
    const id = useRoute().params.id as string
    getPartnerById(id)
}

// const pageTabs = computed(() => [
//     {
//         name: 'Partner Information',
//         path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/partner-info`
//     },
//     {
//         name: 'Vehicles',
//         path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/vehicles`
//     },
//     {
//         name: 'Drivers',
//         path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/drivers`
//     },
//     {
//         name: 'Unsettled Revenues',
//         path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/completed-trips`
//     },
//     {
//         name: 'Account & Payslip',
//         path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/accounts`
//     },
// 	{
//         name: 'Deductions',
//         path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/deductions`
//     }
// ])

const pageTabs = computed(() => {
	const arr = [
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
			name: 'Unsettled Revenues',
			path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/completed-trips`
		},
		{
			name: 'Account & Payslip',
			path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/accounts`
		}
	]
	if (AdminCanAttachPartnerDeductions()) arr.push({
		name: 'Deductions',
		path: `/partners/${selectedPartner.value.id}/${selectedPartner.value.account_sid}/deductions`
	})
	return arr
})

const isVehiclePage = computed(() => {
	return useRoute().fullPath.includes('vehicles')
})
const isDriverPage = computed(() => {
	return useRoute().fullPath.includes('drivers')
})

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

const driverDropdownChildren = computed(() => [
	{ name: 'Link Driver', func: () => { usePartnerModal().openLinkDriver() } },
	{ name: 'Batch Linking', func: () => { usePartnerModal().openBatchLinkDriver() } }
])
</script>

<style scoped>

</style>
