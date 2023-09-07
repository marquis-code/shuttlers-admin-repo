<template>
	<HeadersHeaderSlot :title="`${selectedCorporate.corporate_name}`" pre-title="Overview" :loading="Object.keys(selectedCorporate).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<div class="flex items-center space-x-2">
				<button class="px-4 py-2 text-gray-800 bg-white border-2 rounded-lg border-gray-950">
					Actions
				</button>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'

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
</script>

<style scoped>

</style>
