<template>
	<HeadersHeaderSlot title="Companies" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>

		<template #actions>
			<div class="flex items-center space-x-2">
				<button class="px-4 py-2 bg-black text-white text-sm border-2 rounded-lg border-gray-950" @click="navigateToCreateCompany">
					Add Company
				</button>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { isProdEnv } from '@/composables/utils/system'

const pageTabs = computed(() => {
    const tabs = [
        {
            name: 'Active companies',
            path: '/companies'
        },
        {
            name: 'Demo requests',
            path: '/companies/demo-requests'
        },
        {
            name: 'Notification',
            path: '/companies/wallet-notification'
        }
    ]
    return tabs
})

const navigateToCreateCompany = () => {
	navigateTo({
        path: '/companies/add-company',
        query: {
            tab: 'company-information'
        }
    })
}
</script>

<style scoped></style>
