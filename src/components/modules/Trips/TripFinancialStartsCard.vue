<template>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
		<div v-for="(itm, idx) in financialStats" :key="idx" class="rounded-lg border-[0.4px] h-48 bg-white shadow-md">
			<div class="flex justify-between items-center border-b-[0.9px] px-6 py-3">
				<h1 class="font-semibold">
					{{ itm.title }}
				</h1>
				<button v-if="itm.hasActionButton" class="text-white py-2 text-sm rounded-md px-3 bg-rose-700" @click="useTripsModal().openDeductEarning()">
					Deduct
				</button>
			</div>
			<div class="grid place-content-center h-32">
				<div class="flex justify-center items-center gap-y-2 flex-col">
					<h1 class="font-semibold text-3xl">
						{{ itm.earnings }}
					</h1>
					<p class="text-gray-400 font-medium text-sm">
						{{ itm.description }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { convertToCurrency } from '@/composables/utils/formatter'
import { useTripsModal } from '@/composables/core/modals'
const props = defineProps({
    tripRevenueStats: {
      type: Object,
      required: true,
      default: () => {}
    }
 })
 const financialStats = reactive([
    {
        title: 'Total Revenue',
        description: 'TOTAL EARNINGS',
        earnings: convertToCurrency(props?.tripRevenueStats?.partnersRevenue) ?? '₦ 0.00',
        hasActionButton: false
    },
    {
        title: 'Shuttlers Revenue',
        description: 'SHUTTLERS EARNINGS',
        earnings: convertToCurrency(props?.tripRevenueStats?.shuttlersRevenue) ?? '₦ 0.00',
        hasActionButton: false
    },
    {
        title: 'Partner Revenue',
        description: 'PARTNER EARNINGS',
        earnings: convertToCurrency(props?.tripRevenueStats?.finalPartnersRevenue) ?? '₦ 0.00',
        hasActionButton: true
    }
 ])

</script>
