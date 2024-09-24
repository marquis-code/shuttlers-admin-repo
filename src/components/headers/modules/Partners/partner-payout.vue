<template>
	<HeadersHeaderSlot title="Partner Payout" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template #actions>
			<PopoverRoot class="z-50">
				<PopoverTrigger
					class="px-3 py-2.5 border border-[#D0D5DD] rounded-xl flex items-center z-50"
					aria-label="Update dimensions"
					:disabled="loading"
				>
					<span>Shuttlers Balance:</span>
					<span class="font-bold ml-1 mr-3"> {{ loading ? 'Loading...' : shuttlersBalancePartners.availableBalance }} </span>
					<ChevronDown class="w-4 h-4" />
				</PopoverTrigger>
				<PopoverPortal>
					<PopoverContent
						:side-offset="10"
						align="end"
						align-offset="10"
						class="bg-white rounded-xl border border-[#D0D5DD] shadow-lg"
					>
						<div class="flex flex-col gap-5 p-5 z-50 min-w-[320px]">
							<span class="text-sm text-gray-500 font-bold">Bank info</span>

							<div class="flex flex-col gap-3">
								<div class="flex justify-between items-center gap-3">
									<span class="text-sm text-gray-500">Bank name</span>
									<span class="text-sm font-medium">{{ shuttlersBalancePartners?.bankName || 'N/A' }}</span>
								</div>
								<div class="flex justify-between items-center gap-3">
									<span class="text-sm text-gray-500">Account name</span>
									<span class="text-sm font-medium">{{ shuttlersBalancePartners?.fundingAccountName || 'N/A' }}</span>
								</div>
								<div class="flex justify-between items-center gap-3">
									<span class="text-sm text-gray-500">Account number</span>
									<span class="text-sm font-medium">{{ shuttlersBalancePartners?.accountNumber || 'N/A' }}</span>
								</div>
							</div>
						</div>
					</PopoverContent>
				</PopoverPortal>
			</PopoverRoot>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { useGetShuttlersBalancePartners } from '@/composables/modules/partners/shuttlersBalance'

const { shuttlersBalancePartners, getShuttlersBalancePartners, loading } = useGetShuttlersBalancePartners()

getShuttlersBalancePartners()

const pageTabs = [
    {
        name: 'Pending',
        path: '/partners/payouts'
    },
    {
        name: 'Completed',
        path: '/partners/payouts/completed'
    },
    {
        name: 'Failed',
        path: '/partners/payouts/failed'
    }

]
</script>

<style>
[data-radix-popper-content-wrapper] {
    z-index: 50 !important;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03);
box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08);

}

</style>
