<template>
	<HeadersHeaderSlot title="Additional Charges" pre-title="Overview">
		<template #tabs>
			<div class="flex flex-col w-full">
				<RouterTabs :tabs="pageTabs" />
				<div v-if="$route.fullPath.includes('charges')" class="flex items-center gap-2 border-t p-2">
					<router-link v-for="n,i in chargesTab" :key="i" :to="n.route"
						class="text-xs text-[#ACAFAE] font-medium py-2 px-3 rounded-lg"
						active-class="charge_active"
					>
						{{ n.name }}
					</router-link>
				</div>
			</div>
		</template>
		<template v-if="$route.fullPath.includes('charges')" #actions>
			<button class="px-3 py-2 rounded-lg bg-black text-white text-sm" @click="useChargeModal().openCreateChargeTypes()">
				Add charge type
			</button>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useChargeModal } from '@/composables/core/modals'
const pageTabs = [
    {
        name: 'Pricing control',
        path: '/configuration/pricing/pricing-control'
    },
    {
        name: 'Payment option display',
        path: '/configuration/pricing/payment-option'
    },
    {
        name: 'Additional charges',
        path: '/configuration/pricing/charges'
    }
]

const chargesTab = [
	{ name: 'Configure Charges', route: '/configuration/pricing/charges' },
	{ name: 'Charge Types', route: '/configuration/pricing/charges/types' }
	// {name: 'Charge Report', route: 'ChargesReport'},
]
</script>

<style scoped>
.charge_active{
	color: #0DAC5C;
	background: #F4F5F4;
}
</style>
