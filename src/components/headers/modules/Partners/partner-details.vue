<template>
	<HeadersHeaderSlot :title="`${selectedPartner?.owner?.fname} ${selectedPartner?.owner?.lname}`" pre-title="VEHICLE PARTNER OVERVIEW" :loading="Object.keys(selectedPartner).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { usePartnerIdDetails } from '@/composables/modules/partners/id'

const { selectedPartner, getPartnerById } = usePartnerIdDetails()

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
</script>

<style scoped>

</style>
